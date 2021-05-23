import path = require('path')
import { pg } from '../pg'
import * as fs from 'fs'
import dayjs = require('dayjs')
import { Dayjs } from 'dayjs'

const TABLE_NAME = 'migrations'

export const setupMigrations = async () => {
    try {
        pg.raw(`
CREATE TABLE IF NOT EXISTS ${TABLE_NAME}();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "migrationId" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "executedAt" timestamp with time zone NOT NULL;
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "NAME" VARCHAR(256) NOT NULL;
ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT IF NOT EXISTS UNIQUE("name");
        `)
    } catch (e) {
        // do nothing
    }
}

const migrationsPath = path.join(path.dirname(__dirname), 'migrations')

export const migrateUp = async (migration: string) => {
    console.log(`called migrateUp(${migration})`)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const f = require(path.join(migrationsPath, migration))

    const trx = await pg.transaction()

    try {
        f.up(trx)
        await trx(TABLE_NAME).insert({
            executedAt: dayjs().toISOString(),
            name: migration,
        })
        await trx.commit()
    } catch (e) {
        await trx.rollback(e)
        console.error(e)
    }
}

export const migrateDown = async (migration: string) => {
    console.log(`called migrateDown(${migration})`)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const f = require(path.join(migrationsPath, migration))

    const trx = await pg.transaction()

    try {
        f.down(trx)
        const result = await trx(TABLE_NAME).where('name', migration).del()
        console.log(result)
        await trx.commit()
    } catch (e) {
        await trx.rollback(e)
        console.error(e)
    }
}

export const getDbMigrations = async () => {
    return pg.table('migration').select('*').orderBy('executedAt', 'asc')
}

export const getFsMigrations = () => {
    return fs
        .readdirSync(migrationsPath, { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .filter((item) => item.name.indexOf('---') > 0)
        .filter(
            (item) => item.name.endsWith('.ts') || item.name.endsWith('.js')
        )
        .sort()
        .map((item) => item.name.replace('.ts', '').replace('.js', ''))
}

export const printMigrationsInDb = async () => {
    try {
        const data = await getDbMigrations()
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}

const printPostgresConnectionConfig = () => {
    console.log('process.env.PGUSER=', process.env.PGUSER)
    console.log('process.env.PGHOST=', process.env.PGHOST)
    console.log('process.env.PGDATABASE=', process.env.PGDATABASE)
    console.log('process.env.PGPASSWORD=****')
    console.log('process.env.PGPORT=', process.env.PGPORT)
}

/**
 * Migrate the database.
 *
 * All files of the form ./migrations/*---*.ts get executed in lexicographical order
 * if and only if they are not marked as executed in the `migration` postgres table
 */
export const migrate = async (cmd, args?: string[]) => {
    const arg: string = (args ?? [''])[0]

    if (arg !== '' && arg !== 'back') {
        console.error(`Invalid argument ${arg}`)
        return
    }

    printPostgresConnectionConfig()

    await setupMigrations()
    const migrations = getFsMigrations()

    console.log('Migrations in ./migrations folder')
    for (const migration of migrations) {
        console.log(migration)
    }

    console.log('Before migration')
    await printMigrationsInDb()

    switch (arg) {
        case 'back':
            {
                const res = await pg
                    .table('migration')
                    .select('*')
                    .orderBy('executedAt', 'desc')
                    .limit(1)
                if (res.length > 0) {
                    console.log('Revert last migration')
                    await migrateDown(res[0]?.name)
                } else {
                    console.log('Nothing to do ...')
                }

                console.log('After migration')
                await printMigrationsInDb()
            }
            break

        case '':
            {
                for (const migration of migrations) {
                    const res = await pg
                        .table('migration')
                        .select('*')
                        .where('name', migration)
                    if (res.length === 0) {
                        await migrateUp(migration)
                    }
                }
            }
            console.log('After migration')
            await printMigrationsInDb()
            break
        default:
            console.error(`Invalid argument ${arg}`)
    }

    await pg.destroy()
}

export const formatFileSystemSaveISO = (date: string | Date | Dayjs) => {
    return dayjs(date, { utc: true }).format('YYYY-MM-DDTHH-mm-ss[Z]')
}

export const createMigration = async (name: string) => {
    const now = formatFileSystemSaveISO(dayjs())
    const fileName = `${now}---${name}.ts`
    const fileContent = `import {Transaction} from 'knex'

export const up = async (trx: Transaction) => {
   // add your code here
}  
  
export const down = async (trx: Transaction) => {
   // add your code here
}
`

    return fs.writeFileSync(fileName, fileContent, { encoding: 'utf8' })
}
