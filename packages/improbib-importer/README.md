# Improbib Importer

Keeps Improbib elements in Impromat up-to-date

## Getting started

Setup a connection to the database as the next section describes.

Print difference of current Improbib and the Impromat.

```sh
yarn dev diff
```

Write changes

```sh
yarn dev write --access-token "<access-token>"
```

GraphQL code generation in watch mode

```sh
yarn graphql:codegen --watch
```

## Connecting to the Database

The current setup involves manual steps:

1. Create a new `improbib` user in the database:

```sql
INSERT INTO "User"
(id, "createdAt", "updatedAt", "version", deleted, "deletedAt", "name", "googleSubscriptionId", "accessToken")
VALUES(gen_random_uuid(), now(), now(), 0, false, NULL, 'improbib', NULL, 'access-token');
```

2. Set the `accessToken` to your desired value.
3. Store the `accessToken` somewhere save and use it to authenticate the `improbib-importer` with.

## GraphQL Template

The implementation of the import is using the GraphQL interface and not a direct database connection to:

1. provide a reference implementation how the GraphQL API can be used for future additions.
2. harden the GraphQL interface and find potential limitations / bugs.

Additionally, the improbib is just seen as _another user_ and not a special service within the Impromat itself.

## Libraries

- `graphql-request` as GraphQL client
- `graphql-codegen` for generating typed GraphQL queries
