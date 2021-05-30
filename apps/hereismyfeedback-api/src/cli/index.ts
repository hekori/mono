import { Command } from 'commander'
import { pgBackup } from '../../../../libs/knexutils/src/lib/pgBackup'
import {
  createMigration,
  migrate,
} from '../../../../libs/knexutils/src/lib/migrate'
import * as path from 'path'
const program = new Command()

const TABLE_NAME = 'migrations'

const migrationsPath = path.join(path.dirname(__dirname), 'migrations')

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

program.command('migrate').action(migrate).arguments('[back]').action(migrate)

// .description('execute or revert migrations ./migrations/*.ts', {
//     back: 'revert the last executed migration',
// })

program
  .command('createMigration')
  .action(createMigration)
  .arguments('<action> [pathToDump]')

program.parse(process.argv)
