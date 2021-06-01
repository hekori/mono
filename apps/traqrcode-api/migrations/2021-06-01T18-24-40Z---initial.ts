import { Knex } from 'knex'
import { pg } from '../src/pg'

export const up = async (trx: Knex.Transaction) => {
  // {
  //     "admin": "sebastian.walter@gmail.com",
  //     "createdAt": "2021-05-24T17:00:56Z",
  //     "accessToken": "f945dbe5-ea90-4fd2-a020-26951020b50c",
  //     "shortHash": "20210524_03a6b492-7e1fe1a1",
  //     "test": false,
  //     "idToItem": {
  //     "0": {
  //         "id": "0",
  //             "idToTask": {},
  //         "taskIds": [],
  //             "title": "Toilettenpapier ist alle",
  //             "subTitle": ""
  //     }
  // },
  //     "idToWorker": {
  //     "a88f0f0e": "sebastian.walter@gmail.com"
  // },
  //     "workerIds": [
  //     "a88f0f0e"
  // ],
  //     "itemIds": [
  //     "0"
  // ]
  // }

  const cmd = `
CREATE TABLE IF NOT EXISTS "user"();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "userUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" VARCHAR(256) NOT NULL;

CREATE TABLE IF NOT EXISTS "company"();
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "companyUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;

CREATE TABLE IF NOT EXISTS "page"();
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "pageUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "companyUuid" UUID REFERENCES "company" ("companyUuid");
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "createdBy" UUID REFERENCES "user" ("userUuid");
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "isTest" BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "page" ADD COLUMN IF NOT EXISTS "shortHash" VARCHAR(26) NOT NULL;

CREATE TABLE IF NOT EXISTS "pageItem"();
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "pageItemUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "pageUuid" UUID REFERENCES "page" ("pageUuid");
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "title" VARCHAR(26) NOT NULL;
ALTER TABLE "pageItem" ADD COLUMN IF NOT EXISTS "subTitle" VARCHAR(512) NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS "pageItemProgress"();
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "pageItemProgressUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "pageItemUuid" UUID REFERENCES "pageItem" ("pageItemUuid");
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "pageItemProgress" ADD COLUMN IF NOT EXISTS "status" VARCHAR(8) NOT NULL;

CREATE TABLE IF NOT EXISTS "m2m_company_user"();
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "userUuid" UUID REFERENCES "user" ("userUuid");
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "companyUuid" UUID REFERENCES "company" ("companyUuid");
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "isWorker" BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "isManager" BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "m2m_company_user" ADD COLUMN IF NOT EXISTS "isOwner" BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS "m2m_page_user"();
ALTER TABLE "m2m_page_user" ADD COLUMN IF NOT EXISTS "userUuid" UUID REFERENCES "user" ("userUuid");
ALTER TABLE "m2m_page_user" ADD COLUMN IF NOT EXISTS "pageUuid" UUID REFERENCES "page" ("pageUuid");
ALTER TABLE "m2m_page_user" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;



`

  await pg.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
  // add your code here
}
