import { createInterface } from 'readline'

import execa from 'execa'
import * as path from 'path'
import * as chalk from 'chalk'
import dayjs = require('dayjs')
import { formatFileSystemSaveISO } from './migrate'
import { execLog } from '@hekori/shared'
const ROOT_DIR = path.dirname(path.dirname(__dirname))

enum Action {
    save = 'save',
    restore = 'restore',
}

/// programmatic version of unix pipes: sh -c "firstCommand | secondCommand"
const pipeShellCommands = async (firstCommand, secondCommand) => {
    const firstProcess = execa.command(firstCommand, { shell: true })
    const secondProcess = execa.command(secondCommand, { shell: true })
    if (secondProcess.stdin) {
        firstProcess.stdout?.pipe(secondProcess.stdin)
    }

    firstProcess.stderr?.pipe(process.stderr)
    secondProcess.stderr?.pipe(process.stderr)

    return firstProcess
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

const printPostgresEnvVars = () => {
    console.log(`PGHOST=${process.env.PGHOST}`)
    console.log(`PGDATABASE=${process.env.PGDATABASE}`)
    console.log(`PGPORT=${process.env.PGUSER}`)
    console.log(`PGUSER=${process.env.PGUSER}`)
    console.log('PGPASSWORD=***')
}

export const pgBackup = async (action, backupPath): Promise<void> => {
    const dir = path.join(ROOT_DIR, 'backups')

    switch (action) {
        case 'save': {
            console.log(chalk.green('Saving postgres backup'))
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
                await pipeShellCommands(pgDumpCommand, gzipCommand)
            } catch (err) {
                console.error(chalk.red('An error has occurred.'))
                console.error('Please check that')
                console.error(
                    '1: you have exported the necessary env variables (PGUSER, PGPASSWORD, PGHOST, ...)'
                )
                console.error('2: You can connect to the database')
                console.error(
                    'for an OKD backup: oc login https://console.dev02-emea.hck8s.me:443 --token=****'
                )
                console.error(
                    'for an OKD backup: oc port-forward svc/postgres-postgresql 5432:5432'
                )
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
            await pipeShellCommands(gzipCommand, psqlCommand)

            break
        }
        default:
            throw Error(
                'Unknown action, plse use yarn cli pgBackup save/restore'
            )
    }
}
