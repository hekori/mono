import { formatISO } from "date-fns";
import path = require("path");
import { pg } from "../pg";

const TABLE_NAME = "migrations";

export const setupMigrations = async () => {
  try {
    pg.raw(`
CREATE TABLE IF NOT EXISTS ${TABLE_NAME}();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "migrationId" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "executedAt" timestamp with time zone NOT NULL;
ALTER TABLE ${TABLE_NAME} ADD COLUMN IF NOT EXISTS "NAME" VARCHAR(256) NOT NULL;
ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT IF NOT EXISTS UNIQUE("name");
        `);
  } catch (e) {
    // do nothing
  }
};

const migrationsDirectoryPath = path.join(
  path.dirname(__dirname),
  "migrations"
);

export const migrateUp = async (migration: string) => {
  console.log(`called migrateUp(${migration})`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const f = require(path.join(migrationsDirectoryPath, migration));

  const trx = await pg.transaction();

  try {
    f.up(trx);
    await trx(TABLE_NAME).insert({
      executedAt: formatISO(new Date()),
      name: migration,
    });
    await trx.commit();
  } catch (e) {
    await trx.rollback(e);
    console.error(e);
  }
};

export const migrateDown = async (migration: string) => {
  console.log(`called migrateDown(${migration})`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const f = require(path.join(migrationsDirectoryPath, migration));

  const trx = await pg.transaction();

  try {
    f.down(trx);
    const result = await trx(TABLE_NAME).where("name", migration).del();
    console.log(result);
    await trx.commit();
  } catch (e) {
    await trx.rollback(e);
    console.error(e);
  }
};
