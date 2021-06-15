import { Knex } from 'knex'
import { pg } from '../src/pg'

export const up = async (trx: Knex.Transaction) => {
  const cmd = `
CREATE TABLE IF NOT EXISTS "user"();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "userUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" VARCHAR(256) NOT NULL;

CREATE TABLE IF NOT EXISTS "page"();
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "pageUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "createdBy" UUID REFERENCES "user" ("userUuid") NOT NULL;
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS "pageItem"();
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "pageItemUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "pageUuid" UUID REFERENCES "page" ("pageUuid");
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "title" VARCHAR(26) NOT NULL;
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "subTitle" VARCHAR(512) NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS "pageItemProgress"();
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "pageItemProgressUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "pageItemUuid" UUID REFERENCES "pageItem" ("pageItemUuid");
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "status" VARCHAR(8) NOT NULL;

CREATE TABLE IF NOT EXISTS "pageWorker"();
ALTER TABLE "pageWorker" ADD COLUMN IF NOT EXISTS "pageUuid" UUID REFERENCES "page" ("pageUuid");
ALTER TABLE "pageWorker" ADD COLUMN IF NOT EXISTS "email" VARCHAR(256) NOT NULL;
ALTER TABLE "pageWorker" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "user" ADD CONSTRAINT unique_user_email UNIQUE ("email");


`

  await trx.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
  const cmd = `
DROP TABLE IF EXISTS "pageWorker";
DROP TABLE IF EXISTS "pageItemProgress";
DROP TABLE IF EXISTS "pageItem";
DROP TABLE IF EXISTS "page";
DROP TABLE IF EXISTS "user";

`
  await trx.raw(cmd)
}
