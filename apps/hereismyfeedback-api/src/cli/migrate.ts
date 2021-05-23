import path = require('path')
import { pg } from '../pg'
import * as fs from 'fs'
import dayjs = require('dayjs')
import { Dayjs } from 'dayjs'

const TABLE_NAME = 'migrations'

const migrationsPath = path.join(path.dirname(__dirname), 'migrations')

export const setupMigrations = async () => {
    console.log('Create migrations table if not exists ...')
    await pg.raw(`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS ${TABLE_NAME}();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "executedAt" timestamp with time zone NOT NULL;
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "name" VARCHAR(256) NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS  "${TABLE_NAME}_name_idx" on ${TABLE_NAME} ("name");
`)
    console.log('Done.')
}

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
    return pg.table(TABLE_NAME).select('*').orderBy('executedAt', 'asc')
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
export const migrate = async (arg?: string) => {
    if (arg !== undefined && arg !== 'back') {
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
                    .table(TABLE_NAME)
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

        case undefined:
            {
                for (const migration of migrations) {
                    const res = await pg
                        .table(TABLE_NAME)
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
    const fileAbsPath = path.join(migrationsPath, fileName)
    const fileContent = `import { Knex } from 'knex'

export const up = async (trx: Knex.Transaction) => {
    // add your code here
}

export const down = async (trx: Knex.Transaction) => {
    // add your code here
}
`

    return fs.writeFileSync(fileAbsPath, fileContent, { encoding: 'utf8' })
}
