# Impromat API

## Prerequisites

- NodeJs
- PostgresSQL for running tests

## Getting started

Install dependencies

```
yarn install
```

Start server with watching changes. Useful for development.

```
yarn dev
```

Start tests

> Requires PostgreSQL

```
yarn test
```

Run a specific test

```bash
yarn test --fgrep "empty workshop list"
```

Watch tests

```
yarn test:watch
```

## Database Schema

We manage our database schema with Prisma.

To get general information about Prisma CLI capabilities:

```
yarn prisma --help
```

Generate Prisma artifacts (database client):

```
yarn prisma:generate
```

If you change the database schema, generate a migration script via:

```
yarn prisma:migrate
```

> Restart test infrastructure via `yarn test:backend-restart`.

Generate a new migration script without applying it:

```
yarn prisma migrate dev --create-only
```

## API Naming Conventions

### Queries

Use `where` statements to filter query results.

```graphql
query element(where: {title: "test"}) {
  id
}
```

### Mutations

Use `CRUD` verbs:

- `create` (e.g. `createWorkshop`)
- `update` (e.g. `updateWorkshop`)
- `delete` (e.g. `deleteWorkshop`)

### Sources

- Naming conventions inspired by the [GitHub API](https://docs.github.com/en/graphql/reference/mutations).
- Model as closely as possible to the [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
- Follow [GraphqlCRUD](https://graphqlcrud.org)
- Inspiration from https://github.com/supabase/pg_graphql
