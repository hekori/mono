import { Knex } from 'knex'

export const up = async (trx: Knex.Transaction) => {
  const cmd = `
    ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "annotation" VARCHAR(1024) NOT NULL DEFAULT '';
  `
  await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
  const cmd = `
    ALTER TABLE "pageItemProgress" DROP COLUMN "annotation";
  `
  await trx.raw(cmd)

}
