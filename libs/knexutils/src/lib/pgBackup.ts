import { createInterface } from 'readline'
import * as path from 'path'
import * as chalk from 'chalk'
import { formatFileSystemSaveISO, printPostgresEnvVars } from './utils'
import { execLog } from '@hekori/cli'
import dayjs = require('dayjs')

const ROOT_DIR = path.dirname(
  path.dirname(path.dirname(path.dirname(path.dirname(__dirname))))
)

enum Action {
  save = 'save',
  restore = 'restore',
}

const checkInput = async (message: string, passphrase = 'yes') => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  readline.question('Reset database [yes,no]? ', (answer) => {
    console.log(`${answer}`)
    readline.close()
    if (answer !== 'yes')
      throw Error('You have to answer "yes" to continue. Aborting...')
  })

  for await (const line of readline) {
    console.log(line)
  }
}

export const pgBackup = async (action, backupPath): Promise<void> => {
  const dir = path.join(ROOT_DIR, 'backups')

  console.log('dir=', dir)

  switch (action) {
    case 'save': {
      console.log(chalk.green('Saving postgres backup'))
      console.log('backupPath=', backupPath)

      printPostgresEnvVars()
      await execLog(`mkdir -p ${dir}`)

      if (!backupPath) {
        backupPath = `${path.join(
          dir,
          formatFileSystemSaveISO(dayjs()) + '.zip'
        )}`
      }

      const pgDumpCommand = `pg_dump --no-owner --no-acl --host=${process.env.PGHOST} --username ${process.env.PGUSER} --port ${process.env.PGPORT} ${process.env.PGDATABASE}`
      const gzipCommand = `gzip > '${backupPath}'`
      try {
        await execLog(`${pgDumpCommand} | ${gzipCommand}`)
      } catch (err) {
        console.error(chalk.red('An error has occurred.'))
        console.error('Please check that')
        console.error(
          '1: you have exported the necessary env variables (PGUSER, PGPASSWORD, PGHOST, ...)'
        )
        console.error('2: You can connect to the database')
        console.error(err)
      }

      break
    }
    case 'restore': {
      console.log(chalk.green('Restoring postgres backup'))
      printPostgresEnvVars()
      await checkInput('Reset database [yes,no]? ')

      await execLog(`dropdb ${process.env.PGDATABASE}`)
      await execLog(`createdb ${process.env.PGDATABASE}`)
      const gzipCommand = `gzip -cd ${backupPath}`
      const psqlCommand = `psql ${process.env.PGDATABASE}`
      await execLog(`${gzipCommand} | ${psqlCommand}`)
      break
    }
    default:
      throw Error('Unknown action, please use yarn cli pgBackup save/restore')
  }
}
