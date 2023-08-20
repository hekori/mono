import { Knex } from 'knex'

export const up = async (trx: Knex.Transaction) => {
    const cmd = `
CREATE TABLE IF NOT EXISTS "federatedCredentials"();
ALTER TABLE "federatedCredentials" ADD COLUMN IF NOT EXISTS "federatedCredentialsUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "federatedCredentials" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "federatedCredentials" ADD COLUMN IF NOT EXISTS "userUuid" UUID REFERENCES "user" ("userUuid")  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "federatedCredentials" ADD COLUMN IF NOT EXISTS "provider" VARCHAR(256) NOT NULL;
ALTER TABLE "federatedCredentials" ADD COLUMN IF NOT EXISTS "subject" VARCHAR(256) NOT NULL;
`
    await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
    const cmd = `
DROP TABLE IF EXISTS "federatedCredentials";
`
    await trx.raw(cmd)
}
