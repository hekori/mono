import { Knex } from 'knex'
import { pg } from '../pg'

export const up = async (trx: Knex.Transaction) => {
    const cmd = `
CREATE TABLE IF NOT EXISTS "emojiFeedback"();
ALTER TABLE "emojiFeedback" ADD COLUMN IF NOT EXISTS "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "emojiFeedback" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "emojiFeedback" ADD COLUMN IF NOT EXISTS "title" VARCHAR(256) NOT NULL;


CREATE TABLE IF NOT EXISTS "emojiFeedbackReaction"();
ALTER TABLE "emojiFeedbackReaction" ADD COLUMN IF NOT EXISTS "uuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4();
ALTER TABLE "emojiFeedbackReaction" ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone NOT NULL;
ALTER TABLE "emojiFeedbackReaction" ADD COLUMN IF NOT EXISTS "reaction" VARCHAR(256) NOT NULL;
`

    await pg.raw(cmd)
}

export const down = async (trx: Knex.Transaction) => {
    const cmd = `    
DROP TABLE "emojiFeedbackReaction";
DROP TABLE "emojiFeedback";
`
    await pg.raw(cmd)
}
