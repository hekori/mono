import { Knex } from 'knex'

// see https://openid.net/specs/openid-connect-core-1_0.html for naming convention
export const up = async (trx: Knex.Transaction) => {
    const cmd = `
CREATE TABLE IF NOT EXISTS "oidcCredentials"();
ALTER TABLE "oidcCredentials" ADD COLUMN IF NOT EXISTS "oidcCredentialsUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "oidcCredentials" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "oidcCredentials" ADD COLUMN IF NOT EXISTS "userUuid" UUID REFERENCES "user" ("userUuid")  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "oidcCredentials" ADD COLUMN IF NOT EXISTS "iss" VARCHAR(256) NOT NULL;
ALTER TABLE "oidcCredentials" ADD COLUMN IF NOT EXISTS "sub" VARCHAR(256) NOT NULL;
`
    await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
    const cmd = `
DROP TABLE IF EXISTS "oidcCredentials";
`
    await trx.raw(cmd)
}
