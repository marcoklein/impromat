# Impromat API

## Getting started

Install dependencies

```
yarn install
```

Start server with watching changes. Useful for development

```
yarn dev
```

Start tests

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

Naming conventions inspired by the [GitHub API](https://docs.github.com/en/graphql/reference/mutations).

### Mutations

Prefix mutations that create a new resource with `create`. E.g. `createWorkshop`
