# Impromat API

## Prerequisites

- NodeJs
- PostgresSQL for running tests

## Getting started

Install dependencies

```sh
yarn install
```

Start server with watching changes. Useful for development.

```sh
yarn dev
```

## Running tests

For running against the local database and not the Docker database you might want to create a `.env.test.local` to override the `DATABASE_URL`. And set the `TEST_GOOGLE_AUTH_URL` to a local test login endpoint.

```sh
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=impromat-api-test
TEST_GOOGLE_AUTH_URL=http://localhost:8080/auth/testlogin?redirectUrl=http://localhost:3003
```

> With this configuration you will have to run a Postgres database locally.

Start all tests

> Requires PostgreSQL

```sh
yarn test
```

Run unit tests only (requires no dependencies)

```sh
yarn test:unit
```

Run a specific test

```bash
yarn test -t "empty workshop list"
```

Run a specific test file (faster for testing individual services for example):

```bash
yarn test:jest test/graphql/services/element.service.test
```

Run only jest (without resetting the test database):

```bash
yarn test:jest -t "empty workshop list"
```

Watch tests

```sh
yarn test:watch
```

## Testing Layers

We differentiate the following test layers:

- Unit Tests
- Integration Tests

### Unit Tests

Tests small blocks of code. Generally only code within a single file. Unit tests describe the behavior of a certain class or function. Thus, they are defined in the `src` folder with tests having the `.test.ts` postfix, right next to the code they test.

Example:

If we define a class within the file `src/services/element.service.ts`, we define its unit test in the file `src/services/element.test.ts`. With this approach it is very easy to find it's corresponding test code that holds definitions on the expected behavior.

### Integration Tests

Tests that require external dependencies, like a database or an API.

They are defined in the `test` folder and require its external dependencies to run before a test execution.

## Testing Style

1. Name your tests with `should [do something]` for clarity and readability.
2. Structure tests using the `given` a certain setup, `when` this happens, `then` expect this outcome.

Example:

```ts
it('should trim text', () => {
  // given...
  const input = 'test ';
  // when
  const output = input.trim();
  // then
  expect(output).toBe('test');
});
```

## Service Template Test

See `src/graphql/services/element.service.test.ts` for a template test.

## Database

### Prisma

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

> Rebuild api test infrastructure via `yarn test:backend-rebuild`.

Generate a new migration script without applying it:

```
yarn prisma migrate dev --create-only
```

## API Conventions

### Model as close to Prisma as possible

Take the [typegraphql-prisma generator](https://github.com/MichalLytek/typegraphql-prisma/blob/main/examples/4-nest-js/prisma/generated/type-graphql/resolvers/inputs/UserOrderByWithRelationInput.ts) as an example on how to structure the GraphQL API.

### Queries

Use `where` statements to filter query results.

```graphql
query element(where: {title: {equals: "test" }}) {
  id
}
```

### Default values

Use `defaultValue` where applicable to avoid `isNullable` fields. With this, clients see default values for e.g. filters.

E.g. in code:

```ts
// ...
@Args('filter', {
  type: () => WorkshopsFilterInput,
  defaultValue: { liked: true, owned: true },
})
input: WorkshopsFilterInput,
// ...
```

Generated GraphQL:

```graphql
# ...
workshops(filter: WorkshopsFilterInput! = {liked: true, owned: true}): [Workshop!]!
# ...
```

### Make users and owners part of filters

Allow filtering for owned by workhops or elements.

DO NOT make nested relationships on user specific items.

```graphql
# NOT
me {
  elements
}
# BUT
elements(filter: {ownerId: { equals: "my-user-id" }})
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
