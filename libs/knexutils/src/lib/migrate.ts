import path = require('path')
import { pg } from '../../../../apps/hereismyfeedback-api/src/pg'
import * as fs from 'fs'
import dayjs = require('dayjs')
import { Dayjs } from 'dayjs'

interface MigrateInput {
  migrationName: string
  tableName: string
  absolutePathToMigrationsDirectory: string
  direction?: string
}

export const setupMigrations = async ({
  tableName = 'migrations',
}: Pick<MigrateInput, 'tableName'>) => {
  console.log('Create migrations table if it does not exist ...')
  await pg.raw(`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS ${tableName}();
ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "executedAt" timestamp with time zone NOT NULL;
ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "name" VARCHAR(256) NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS  "${tableName}_name_idx" on ${tableName} ("name");
`)
  console.log('Done.')
}

export const migrateUp = async ({
  migrationName,
  absolutePathToMigrationsDirectory,
  tableName,
}: MigrateInput) => {
  console.log(`called migrateUp(${migrationName})`)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const f = require(path.join(absolutePathToMigrationsDirectory, migrationName))

  const trx = await pg.transaction()

  try {
    f.up(trx)
    await trx(tableName).insert({
      executedAt: dayjs().toISOString(),
      name: migrationName,
    })
    await trx.commit()
  } catch (e) {
    await trx.rollback(e)
    console.error(e)
  }
}

export const migrateDown = async ({
  migrationName,
  absolutePathToMigrationsDirectory,
  tableName,
}: MigrateInput) => {
  console.log(`called migrateDown(${migrationName})`)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const f = require(path.join(absolutePathToMigrationsDirectory, migrationName))

  const trx = await pg.transaction()

  try {
    f.down(trx)
    const result = await trx(tableName).where('name', migrationName).del()
    console.log(result)
    await trx.commit()
  } catch (e) {
    await trx.rollback(e)
    console.error(e)
  }
}

export const getDbMigrations = async ({
  tableName,
}: Pick<MigrateInput, 'tableName'>) => {
  return pg.table(tableName).select('*').orderBy('executedAt', 'asc')
}

export const getFsMigrations = ({
  absolutePathToMigrationsDirectory,
}: Pick<MigrateInput, 'absolutePathToMigrationsDirectory'>) => {
  return fs
    .readdirSync(absolutePathToMigrationsDirectory, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .filter((item) => item.name.indexOf('---') > 0)
    .filter((item) => item.name.endsWith('.ts') || item.name.endsWith('.js'))
    .sort()
    .map((item) => item.name.replace('.ts', '').replace('.js', ''))
}

export const printMigrationsInDb = async ({
  tableName,
}: Pick<MigrateInput, 'tableName'>) => {
  try {
    const data = await getDbMigrations({ tableName })
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
export const migrate = async ({
  absolutePathToMigrationsDirectory,
  tableName,
  direction,
}: MigrateInput) => {
  printPostgresConnectionConfig()

  await setupMigrations({ tableName })
  const migrations = getFsMigrations({ absolutePathToMigrationsDirectory })

  console.log('Migrations in ./migrations folder')
  for (const migration of migrations) {
    console.log(migration)
  }

  console.log('Before migration')
  await printMigrationsInDb({ tableName })

  switch (direction) {
    case 'back':
      {
        const res = await pg
          .table(tableName)
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
        await printMigrationsInDb({ tableName })
      }
      break

    case undefined:
      {
        for (const migration of migrations) {
          const res = await pg
            .table(tableName)
            .select('*')
            .where('name', migration)
          if (res.length === 0) {
            await migrateUp({
              migrationName: migration,
              absolutePathToMigrationsDirectory,
              tableName,
            })
          }
        }
      }
      console.log('After migration')
      await printMigrationsInDb({ tableName })
      break
    default:
      console.error(`Invalid argument ${direction}`)
  }

  await pg.destroy()
}

export const formatFileSystemSaveISO = (date: string | Date | Dayjs) => {
  return dayjs(date, { utc: true }).format('YYYY-MM-DDTHH-mm-ss[Z]')
}

export const createMigration = async ({
  migrationName,
  absolutePathToMigrationsDirectory,
}: Pick<
  MigrateInput,
  'migrationName' | 'absolutePathToMigrationsDirectory'
>) => {
  const now = formatFileSystemSaveISO(dayjs())
  const fileName = `${now}---${migrationName}.ts`
  const fileAbsPath = path.join(absolutePathToMigrationsDirectory, fileName)
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
