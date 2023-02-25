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

Generate Prisma schema changes

```
yarn prisma:generate
```

## API Design

- Naming conventions inspired by the [GitHub API](https://docs.github.com/en/graphql/reference/mutations).
- Model as closely as possible to the [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
- Follow [GraphqlCRUD](https://graphqlcrud.org)

### Mutations

Use `CRUD` verbs:

- `create` (e.g. `createWorkshop`)
- `update` (e.g. `updateWorkshop`)
- `delete` (e.g. `deleteWorkshop`)
