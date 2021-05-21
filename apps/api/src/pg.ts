import knex from "knex"

export const pg = knex({
  client: "pg",
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT ?? "5432"),
  pool: { min: 0 },
})





