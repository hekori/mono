# Traqrcode

Track & act on QR code scans!

## Develop locally

Assumptions and prequisites
- your local machine is MacOS or Linux
- node 14 & yarn & docker compose is installed

Getting started
```shell
cp projects/traqrcode-env/traqrcode--dev.template.txt ../traqrcode--dev.txt
vim ../traqrcode--dev.txt
ln -s ../traqrcode--dev.txt ../.env
yarn install
yarn postcss
yarn traqrcode:pg:start
yarn traqrcode:cli migrate
yarn traqrcode:serve:backend
yarn traqrcode:serve:frontend
```

## Provisioning on {yourdomain}

We assume a fresh Debian 10 system with a passwordless ssh root access.

```shell
cp projects/traqrcode-env/traqrcode--prod.template.txt ../traqrcode--prod.txt
vim ../traqrcode--prod.txt
yarn traqrcode:provision
```

This installs all required Debian packages and creates directories. Roughly speaking

- nginx for the static file serving
- reverse proxy for the NodeJS backend app
- pm2 as process manager to launch backend app

After completing you should have the following file structure on the remote {yourdomain}.
It also uploads the `../traqrcode--prod.txt` to the remote server.

```
/webapps/{yourdomain}# tree -L 2
.
├── assets
│   ├── available
│   └── enabled -> /webapps/traqrcode_com/assets/available/2021-11-01T17-11-40-043000Z
├── git
│   ├── branches
│   ├── config
│   ├── description
│   ├── HEAD
│   ├── hooks
│   ├── info
│   ├── objects
│   └── refs
├── logs
│   ├── assets_nginx_access.log
│   ├── assets_nginx_error.log
│   ├── backend_nginx_access.log
│   ├── backend_nginx_error.log
│   ├── nginx_access.log
│   └── nginx_error.log
├── traqrcode--prod.txt
└── webapp
    ├── apps
    ├── babel.config.json
    ├── dist
    ├── jest.config.js
    ├── jest.preset.js
    ├── libs
    ├── migrations.json
    ├── node_modules
    ├── nx.json
    ├── package.json
    ├── postcss.config.js
    ├── prettier.config.js
    ├── projects
    ├── raw
    ├── README.md
    ├── tailwind.config.js
    ├── tools
    ├── tsconfig.base.json
    ├── webpack.config.js
    ├── workspace.json
    ├── yarn-error.log
    └── yarn.lock
```
and
```
/etc/nginx# tree -L 2 
/etc/nginx
├── sites-available
│   ├── default
│   └── {yourdomain}
└── sites-enabled
    └── {yourdomain} -> /etc/nginx/sites-available/{yourdomain}
```

Then use `pm2` to automatically launch the application on port 8000.

> Note: In `traqrcode-docker` you can find docker-compose files as inspiration how to deploy to a K8s stack.

### Sending E-Mails

There are two options:

1) Send email from an SMTP Server
2) Send email directly from the APP Server

For 1. you need to add the SMTP credentials to the `../traqrcode--prod.txt` file.
For 2. you need to setup SPF and DKIM DNS records. Otherwise, your emails will get flagged as spam.

> Note: Option 1) is currently not fully supported.

#### Add SPF TXT record to your DNS records

Allow sending from specific IP listed in the A or MX records for your domain, soft-fail all others
```
v=spf1 a mx ~all
```

Allow sending from specific IPs, soft-fail all others
```
v=spf1 ip4:83.169.7.235 ip6:2a01:488:66:1000:b01c:c72:0:1 ~all
```

Ref: https://dmarcian.com/spf-syntax-table/

#### Add DKIM TXT record to your DNS records

```
ssh root@{yourdomain}
cd /webapps/{yourdomain}
mkdir dkim && cd dkim
apt-get update
apt-get upgrade
apt-get install opendkim opendkim-tools
opendkim-genkey -s mail -d {yourdomain}
```
Put the private key into `../traqrcode--prod.txt` and the public key
to a TXT DNS records
```
TXT DNS record
Name: mail._domainkey.{yourdomain}.
Text: v=DKIM1; k=rsa; p=MIxxxxxxxxxxxxxxxxxxAB
```

Ref: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy

### PM2

Several commands that you may find useful.

```
ssh root@traqrcode.com
pm2 list
pm2 delete all
pm2 start "<cmd>" --name "<name>"
pm2 log api_traqrcode_com
```

### Tailwind and PostCSS

Please note that all the CSS classes are defined in libs/uikit.
When you run `yarn postcss` all files get scanned for css classes. Everything that cannot be found is purged from the App.css.

The details of the purging an be found in the file `tailwind.config.js`.

```javascript
module.exports = {
  purge: {
    enabled: true, // set to true to remove all unused classes from App.css
    content: [
      './apps/**/*.{js,ts,jsx,tsx}',
      './libs/**/*.{js,ts,jsx,tsx}',
      './projects/**/*.{js,ts,jsx,tsx}',
    ],
  },
```