//https://stackoverflow.com/questions/59813513/how-to-run-nestjs-console-commands-in-context-of-angular-nx-workspace

import { Command } from 'commander'

import * as path from 'path'
import { Migrate, pgBackup } from '@hekori/knexutils'
import { pg } from './src/pg'
const program = new Command()

const absolutePathToMigrationsDirectory = path.join(__dirname, 'migrations')

const migrate = new Migrate({
  pg,
  absolutePathToMigrationsDirectory,
  tableName: 'migrations',
})

program.version('0.0.1').description('Postgres backups and migrations.')

program
  .command('pgBackup')
  .arguments('<action> [pathToDump]')
  .description('save or restore a postgres database dump', {
    action: 'save or restore',
    pathToDump: 'path to the gzipped database dump',
  })
  .action(pgBackup)

program
  .command('migrate')
  .action((direction: undefined | 'back') => {
    migrate.migrate({ direction })
  })
  .arguments('[back]')

// .description('execute or revert migrations ./migrations/*.ts', {
//     back: 'revert the last executed migration',
// })

program
  .command('createMigration')
  .action((migrationName: string) => {
    migrate.createMigration({ migrationName })
  })
  .arguments('<migrationName>')

program.parse(process.argv)
