import path = require('path')
import dayjs = require('dayjs')
import * as fs from 'fs'
import { Knex } from 'knex'
import { formatFileSystemSaveISO, printPostgresEnvVars } from './utils'

interface MigrateInput {
  migrationName: string
  direction?: 'back'
}

export class Migrate {
  pg: Knex
  tableName: string
  absolutePathToMigrationsDirectory: string

  constructor({
    pg,
    tableName,
    absolutePathToMigrationsDirectory,
  }: {
    pg: Knex
    tableName: string
    absolutePathToMigrationsDirectory: string
  }) {
    this.pg = pg
    this.tableName = tableName
    this.absolutePathToMigrationsDirectory = absolutePathToMigrationsDirectory
  }

  async setupMigrations() {
    console.log('Create migrations table if it does not exist ...')
    await this.pg.raw(`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS ${this.tableName}();
ALTER TABLE ${this.tableName} ADD COLUMN IF NOT EXISTS "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE ${this.tableName} ADD COLUMN IF NOT EXISTS "executedAt" timestamp with time zone NOT NULL;
ALTER TABLE ${this.tableName} ADD COLUMN IF NOT EXISTS "name" VARCHAR(256) NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS  "${this.tableName}_name_idx" on ${this.tableName} ("name");
`)
    console.log('Done.')
  }

  async migrateUp({ migrationName }: MigrateInput) {
    console.log(`called migrateUp(${migrationName})`)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const f = require(path.join(
      this.absolutePathToMigrationsDirectory,
      migrationName
    ))

    const trx = await this.pg.transaction()

    try {
      f.up(trx)
      await trx(this.tableName).insert({
        executedAt: dayjs().toISOString(),
        name: migrationName,
      })
      await trx.commit()
    } catch (e) {
      await trx.rollback(e)
      console.error(e)
    }
  }

  async migrateDown({ migrationName }: MigrateInput) {
    console.log(`called migrateDown(${migrationName})`)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const f = require(path.join(
      this.absolutePathToMigrationsDirectory,
      migrationName
    ))

    const trx = await this.pg.transaction()

    try {
      f.down(trx)
      const result = await trx(this.tableName)
        .where('name', migrationName)
        .del()
      console.log(result)
      await trx.commit()
    } catch (e) {
      await trx.rollback(e)
      console.error(e)
    }
  }

  /**
   * Migrate the database.
   *
   * All files of the form ./migrations/*---*.ts get executed in lexicographical order
   * if and only if they are not marked as executed in the `migration` postgres table
   */
  async migrate({ direction }: Pick<MigrateInput, 'direction'>) {
    printPostgresEnvVars()

    await this.setupMigrations()
    const migrationNames = this.getFsMigrations()

    console.log('Migrations in ./migrations folder')
    for (const migration of migrationNames) {
      console.log(migration)
    }

    console.log('Before migration')
    await this.printMigrationsInDb()

    switch (direction) {
      case 'back':
        {
          const res = await this.pg
            .table(this.tableName)
            .select('*')
            .orderBy('executedAt', 'desc')
            .limit(1)
          if (res.length > 0) {
            console.log('Revert last migration')
            await this.migrateDown({ migrationName: res[0]?.name })
          } else {
            console.log('Nothing to do ...')
          }

          console.log('After migration')
          await this.printMigrationsInDb()
        }
        break

      case undefined:
        {
          for (const migrationName of migrationNames) {
            const res = await this.pg
              .table(this.tableName)
              .select('*')
              .where('name', migrationName)
            if (res.length === 0) {
              await this.migrateUp({
                migrationName: migrationName,
              })
            }
          }
        }
        console.log('After migration')
        await this.printMigrationsInDb()
        break
      default:
        console.error(`Invalid argument ${direction}`)
    }

    await this.pg.destroy()
  }

  async createMigration({ migrationName }: MigrateInput) {
    const now = formatFileSystemSaveISO(dayjs())
    const fileName = `${now}---${migrationName}.ts`
    const fileAbsPath = path.join(
      this.absolutePathToMigrationsDirectory,
      fileName
    )
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

  async getDbMigrations(tableName: string) {
    return this.pg.table(tableName).select('*').orderBy('executedAt', 'asc')
  }

  getFsMigrations() {
    return fs
      .readdirSync(this.absolutePathToMigrationsDirectory, {
        withFileTypes: true,
      })
      .filter((item) => !item.isDirectory())
      .filter((item) => item.name.indexOf('---') > 0)
      .filter((item) => item.name.endsWith('.ts') || item.name.endsWith('.js'))
      .sort()
      .map((item) => item.name.replace('.ts', '').replace('.js', ''))
  }

  async printMigrationsInDb() {
    try {
      const data = await this.getDbMigrations(this.tableName)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
}
