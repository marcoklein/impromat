# Improbib Importer

Keeps Improbib elements in Impromat up-to-date

## Getting started

Print difference of current Improbib and the Impromat.

```sh
yarn dev diff
```

GraphQL code generation in watch mode

```sh
yarn graphql:codegen --watch
```

## GraphQL Template

The implementation of the import is using the GraphQL interface and not a direct database connection to:

1. provide a reference implementation how the GraphQL API can be used for future additions.
2. harden the GraphQL interface and find potential limitations / bugs.

Additionally, the improbib is just seen as _another user_ and not a special service within the Impromat itself.

## Libraries

- `graphql-request` as GraphQL client
- `graphql-codegen` for generating typed GraphQL queries
