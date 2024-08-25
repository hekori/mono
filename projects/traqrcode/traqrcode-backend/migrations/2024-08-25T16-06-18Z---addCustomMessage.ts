import { Knex } from 'knex'

export const up = async (trx: Knex.Transaction) => {
    const cmd = `
    ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "customInstructions" VARCHAR(1024) NOT NULL DEFAULT '';
  `
    await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
    const cmd = `
    ALTER TABLE "pageItem" DROP COLUMN "customInstructions";
  `
    await trx.raw(cmd)
}
