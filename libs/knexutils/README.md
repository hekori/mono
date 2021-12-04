# knexutils

Use this library to
- create backups
- create database migrations
using your knex instance.


#### Example
```typescript

// required: knex instance + Postgres connection
export const pg = knex({
    client: 'pg',
    connection: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT ?? '5432'),
        pool: { min: 0 },
    },
})

// migrate database forward/backward
const migrate = new Migrate({
    pg,
    absolutePathToMigrationsDirectory,
    tableName: 'migrations',
})
await migrate.migrate({})
await migrate.migrate({ direction: 'back' })

// save and restore backups
await pgBackup('save', '/path/to/backup.zip')
await pgBackup('restore', '/path/to/backup.zip')
```

## Running unit tests

Run `nx test knexutils` to execute the unit tests via [Jest](https://jestjs.io).
