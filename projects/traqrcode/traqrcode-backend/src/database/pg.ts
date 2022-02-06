import knex from 'knex'
import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from '../settings'

export const pg = knex({
  client: 'pg',
  connection: {
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    pool: { min: 0 },
  },
})
