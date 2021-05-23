import { Command } from 'commander'
import { pgBackup } from './pgBackup'
import { createMigration, migrate } from './migrate'
const program = new Command()

program
    .version('0.0.1')
    .description(
        'Create, setup and destroy postgres databases for development.'
    )

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
    .action(migrate)
    .arguments('<action>')
    .description('save or restore a postgres database dump', {
        action:
            "use 'migrate' migrates forward all migrations. 'migrate back' goes back one migration",
    })

program
    .command('createMigration')
    .action(createMigration)
    .arguments('<action> [pathToDump]')

program.parse(process.argv)
