# Impromat Api

## Getting started

Install dependencies

```
yarn install
```

Start server without watching changes

```
yarn start:dev
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

## Code Generation

Above scripts run all code generation. See the `codegen` folder for configuration.

## Deployment with Podman

Install via https://podman.io/getting-started/installation

Build an image

```
podman build .
```

```
podman run --latest
```

## Google OAuth2

https://console.cloud.google.com/apis/credentials

Fill environment variables starting with `GOOGLE_AUTH_` with client id, secret, and redirect url.

About Google Identity: https://developers.google.com/identity/gsi/web/guides/display-button#html

> Impromat will only process your Google Id for verification. We will neither process your email address nor your name.

A Google authentication response contains the following data:

```bash
sub # your unique google id
email # your primary email address
email_verified # flag, if your email is verified
```

## GitHub Actions

GitHub Actions can deploy a new release version on merge to the main branch.
They must be regenerated on a new server installation.

Generate SSH keys running

```
ssh-keygen
```

The public key must be added to the `authorized_keys` file on the host.

Add the private key into the `IMPROMAT_SERVER_SSH_PRIVATE_KEY` secret on GitHub Actions.

On the server run

```bash
ssh-keyscan api.impromat.marcoklein.dev
```

Copy the output into the `IMPROMAT_SERVER_KNOWN_HOSTS` secret.

With this configuration GitHub Action is able to establish an SSH connection to the server.

## Authentication

If the user authenticates they receive a secure cookie that they must present in subsequent calls. Token validation happens on the server side.

## Frameworks

- express: manage all http requests
- express-sessions: manage sessions with express
- uuid: Generate session tokens and unique identifiers
- google-auth-library: allow authentication via Google OAuth2
- graphql-yoga: GraphQL web server
- graphql-scalars: Common scalars for GraphQL
- graphql-codegen: GraphQL code generation
- ts-json-schema-generator: Generate json schema from TypeScript
