import * as moment from 'moment'
import * as flightplan from 'flightplan'
import slugify from 'slugify'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'

import { config } from 'dotenv'
import * as path from 'path'

const LOCAL_ROOT_DIR = path.join(__dirname, '../../..')
const LOCAL_PARENT_DIR = path.join(LOCAL_ROOT_DIR, '..')

const DOT_ENV_PATH = path.join(LOCAL_PARENT_DIR, 'traqrcode--prod.txt')

config({ path: DOT_ENV_PATH })

console.log(`loaded\n${DOT_ENV_PATH}`)

const DEPLOY_HOST = process.env.DEPLOY_HOST || 'DEPLOY_HOST'
const FRONTEND_URL = process.env.FRONTEND_URL || 'FRONTEND_URL'
const BACKEND_URL = process.env.BACKEND_URL || 'BACKEND_URL'

const FRONTEND_HOST = FRONTEND_URL?.split('//')[1] || 'FRONTEND_HOST'
const BACKEND_HOST = BACKEND_URL?.split('//')[1] || 'BACKEND_HOST'

const SSL_CERTIFICATE_PATH_CHAINED =
  process.env.SSL_CERTIFICATE_PATH_CHAINED || 'SSL_CERTIFICATE_PATH_CHAINED'
const SSL_CERTIFICATE_PATH_PRIVKEY =
  process.env.SSL_CERTIFICATE_PATH_PRIVKEY || 'SSL_CERTIFICATE_PATH_PRIVKEY'

const PORT = process.env.PORT || 'PORT'

const HOST_SLUG =
  process.env.HOST_SLUG || slugify(FRONTEND_HOST, { remove: /[*+~.()'"!:@]/g })

const PROTOCOLS = ['http', 'https']

const PM2_NAME = `api_${HOST_SLUG}`

const ROOT_DIR = process.env.ROOT_DIR
// console.log(process.env.DEPLOY_HOST)
// console.log(process.env.SSH_AUTH_SOCK)
// console.log(ROOT_DIR)

console.log(`LOCAL_ROOT_DIR = ${LOCAL_ROOT_DIR}`)
console.log(`LOCAL_PARENT_DIR = ${LOCAL_PARENT_DIR}`)
console.log(`FRONTEND_URL = ${FRONTEND_URL}`)
console.log(`BACKEND_URL = ${BACKEND_URL}`)
console.log(`FRONTEND_HOST = ${FRONTEND_HOST}`)
console.log(`BACKEND_HOST = ${BACKEND_HOST}`)
console.log(`SSL_CERTIFICATE_PATH_CHAINED = ${SSL_CERTIFICATE_PATH_CHAINED}`)
console.log(`SSL_CERTIFICATE_PATH_PRIVKEY = ${SSL_CERTIFICATE_PATH_PRIVKEY}`)
console.log(`HOST_SLUG = ${HOST_SLUG}`)
console.log(`DEPLOY_HOST = ${DEPLOY_HOST}`)
console.log(`ROOT_DIR = ${ROOT_DIR}`)
console.log(`PM2_NAME = ${PM2_NAME}`)

export const getNow = (): string => {
  return moment().utc().format('YYYY-MM-DD[T]HH-mm-ss-SSSSSS[Z]')
}

flightplan.target('prod', {
  host: process.env.DEPLOY_HOST || '',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK || '',
  privateKey: `${process.env.HOME}/.ssh/id_rsa`,
})

// run commands on localhost
flightplan.local('deploy', (local) => {
  // local.log('Build frontend')
  // local.with('cd packages/frontend', () => {
  //   local.exec('yarn build')
  // })
  // local.log('Build backend')
  // local.with('cd packages/backend', () => {
  //   local.exec('yarn build')
  // })

  local.exec(`git push ${HOST_SLUG} master`)

  local.with(`cd ${LOCAL_PARENT_DIR}`, () => {
    local.transfer('traqrcode--prod.txt', `${ROOT_DIR}`)
  })
})

// run commands on remote
flightplan.remote('deploy', (remote) => {
  remote.log('Make dir')
  remote.exec('pwd')

  // deploy frontend
  remote.with(`cd ${ROOT_DIR}/webapp`, () => {
    remote.exec(`git pull`)
    remote.exec('yarn install --frozen-lockfile')

    const TARGET_DIR = `${ROOT_DIR}/assets/available/${getNow()}`
    remote.exec('yarn clean')
    remote.exec('yarn traqrcode:build:prod:frontend')
    remote.exec(
      `cp -r dist/projects/traqrcode/traqrcode-frontend ${TARGET_DIR}`
    )
    remote.exec(`rm -f ${ROOT_DIR}/assets/enabled`)
    remote.exec(`ln -s ${TARGET_DIR} ${ROOT_DIR}/assets/enabled`)
  })
  // migrate database
  remote.with(`cd ${ROOT_DIR}/webapp`, () => {
    remote.exec(`yarn traqrcode:cli migrate`)
  })

  remote.exec('service nginx stop')
  remote.exec(`pm2 restart "${PM2_NAME}"`)
  remote.exec('service nginx start')
})

flightplan.local('push-ssh-key', (local) => {
  local.exec(`ssh-copy-id -i ~/.ssh/id_rsa.pub root@${DEPLOY_HOST}`)
})

// run commands on remote to setup the debian box
flightplan.remote('provision', (remote) => {
  //https://tecadmin.net/install-sendmail-on-debian-10-buster/

  remote.log('Install apt packages')

  remote.exec(
    'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
  )
  remote.exec(
    'echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list'
  )

  // install postgres
  remote.exec('sudo apt -y install gnupg2')
  remote.exec(
    'wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -'
  )
  remote.exec(
    'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list'
  )

  remote.exec('locale-gen en_US.UTF-8')

  remote.exec('curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -')

  remote.exec('apt-get update')
  remote.exec(
    'apt-get install -y nginx yarn git certbot python-certbot-nginx sendmail-bin python make g++ postgresql-14 postgresql-contrib'
  )

  remote.log('Install npm packages')
  remote.exec('yarn global add pm2')

  remote.log('Setup folders')
  remote.exec(`mkdir -p ${ROOT_DIR}`)
  remote.exec(`mkdir -p ${ROOT_DIR}/logs`)
  remote.exec(`mkdir -p ${ROOT_DIR}/git`)
  remote.exec(`mkdir -p ${ROOT_DIR}/assets/available`)

  remote.with(`cd ${ROOT_DIR}/git`, () => {
    remote.log('Create bare git repo')
    remote.exec(`git init --bare`)
  })

  remote.log('Setup Letsencryt Certbot')
  // FIXME: this is a workaround for a bug. Should check if SSL certs are setup and skip this step.
  remote.prompt(
    'Run "certbot certonly --nginx" on the remote server. Then press Enter.'
  )
  remote.prompt('Run "sendmailconfig" on the remote server. Then press Enter.')
})

flightplan.local('provision', (local) => {
  local.log('Prepare files for upload in ./tmp directory')
  local.exec('rm -rf ./tmp')
  local.exec('mkdir -p ./tmp/provision')

  for (const protocol of PROTOCOLS) {
    const nginx_conf = fs.readFileSync(
      `${__dirname}/installation/nginx.${protocol}.template.txt`,
      'utf8'
    )
    const template = Handlebars.compile(nginx_conf)
    const nginx_conf_replaced = template({
      PORT,
      HOST_SLUG,
      BACKEND_HOST,
      FRONTEND_HOST,
      SSL_CERTIFICATE_PATH_CHAINED,
      SSL_CERTIFICATE_PATH_PRIVKEY,
    })
    const nginxConfFileName = `${HOST_SLUG}_${protocol}`

    fs.writeFileSync(
      `./tmp/provision/${nginxConfFileName}`,
      nginx_conf_replaced
    )
    local.with(`cd ./tmp/provision/`, () => {
      local.transfer([`${nginxConfFileName}`], '/etc/nginx/sites-available')
    })
  }

  local.log('Push git repo to remote')
  local.exec(`git remote rm ${HOST_SLUG}`)
  local.exec(`git remote add ${HOST_SLUG} root@${DEPLOY_HOST}:${ROOT_DIR}/git`)
  local.exec(`git push -u ${HOST_SLUG} master`)

  local.log(`Push DOT_ENV file ${DOT_ENV_PATH}`)
  local.exec(`ls -lah ${DOT_ENV_PATH}`)

  local.with(`cd ${LOCAL_PARENT_DIR}`, () => {
    local.transfer('traqrcode--prod.txt', `${ROOT_DIR}`)
  })
})

flightplan.remote('provision', (remote) => {
  remote.log('Clone git repo to webapp')
  remote.with(`cd ${ROOT_DIR}`, () => {
    remote.exec('git clone git webapp || true')
  })

  remote.log('Setup nginx config files')
  remote.exec('rm -f /etc/nginx/sites-enabled/default')

  for (const protocol of PROTOCOLS) {
    const nginxConfFileName = `${HOST_SLUG}_${protocol}`
    remote.exec(
      `ln -fs /etc/nginx/sites-available/${nginxConfFileName} /etc/nginx/sites-enabled/${nginxConfFileName}`
    )
  }

  remote.with(`cd ${ROOT_DIR}`, () => {
    remote.exec('ln -fs traqrcode--prod.txt .env')
  })

  remote.log('Setup pm2')
  remote.with(`cd ${ROOT_DIR}/webapp`, () => {
    remote.exec('pm2 delete all || true')
    remote.exec(`pm2 start "yarn traqrcode:serve:backend" --name "${PM2_NAME}"`)
    remote.exec(`pm2 save`)
    remote.exec(`pm2 startup`)
  })
})
