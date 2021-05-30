//https://stackoverflow.com/questions/59813513/how-to-run-nestjs-console-commands-in-context-of-angular-nx-workspace

import { Command } from 'commander'

import * as path from 'path'
import { Migrate, pgBackup } from '@hekori/knexutils'
import { pg } from '../pg'
const program = new Command()

const absolutePathToMigrationsDirectory = path.join(
  path.dirname(__dirname),
  'migrations'
)

const migrate = new Migrate({
  pg,
  absolutePathToMigrationsDirectory,
  tableName: 'migrations',
})

program
  .version('0.0.1')
  .description('Create, setup and destroy postgres databases for development.')

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
  .action((args) => {
    console.log(args)
  })
  .arguments('[back]')

// .description('execute or revert migrations ./migrations/*.ts', {
//     back: 'revert the last executed migration',
// })

program
  .command('createMigration')
  .action((args) => {
    console.log(args)
  })
  .arguments('<action> [pathToDump]')

program.parse(process.argv)
