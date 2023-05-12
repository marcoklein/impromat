## Instructions for migrating PROD database from JSON file

Get db info with password

```
yarn dokku postgres:info impromat-db-development
```

Expose to random port

```
yarn dokku postgres:expose impromat-db-development
```

Push db changes from `impromat-api` repo.

```
DATABASE_URL=... yarn prisma db push
```

Run migration

```
DATABASE_URL=... yarn dlx ts-node prisma/db-json-migration.ts
```

Unexpose database

```
yarn dokku postgres:unexpose impromat-db-development
```
