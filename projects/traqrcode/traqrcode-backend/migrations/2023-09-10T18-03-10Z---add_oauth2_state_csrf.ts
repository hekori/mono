import { Knex } from 'knex'

export const up = async (trx: Knex.Transaction) => {
    const cmd = `
CREATE TABLE IF NOT EXISTS "oidcCsrfState"();
ALTER TABLE "oidcCsrfState" ADD COLUMN IF NOT EXISTS "oidcCsrfStateUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "oidcCsrfState" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "oidcCsrfState" ADD COLUMN IF NOT EXISTS "csrfToken" VARCHAR(256) NOT NULL;

ALTER TABLE "oidcCsrfState" ADD CONSTRAINT unique_oidcCsrfState_csrfToken UNIQUE ("csrfToken");
`
    await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
    const cmd = `
DROP TABLE IF EXISTS "oidcCsrfState";
`
    await trx.raw(cmd)
}
