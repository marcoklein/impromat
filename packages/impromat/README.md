# Impromat

Cross-platform app for planning improvisational theatre workshops.

## Getting started

```
yarn install
```

Run with

```
yarn start
```

Run tests in watch mode for development:

```sh
yarn test:watch
```

To develop certain functionalities use `--grep` to limit test execution:

```sh
yarn test:watch --exec yarn test --grep Account
```

## Logging

We use `debug` for logging. Enable logging for tests via

```
DEBUG="impromat:*" yarn test
```

## Linter

Run linter with auto fix via:

```
yarn lint:fix
```

## Tests

Playwright executes frontend tests.

To run tests start the application and run

```sh
yarn test:headed
```

To create a new test use the code generation with

```sh
yarn playwright:codegen
```

Debug tests by using

```
yarn test:debug
```

Print debug results for webServer config errors:

```
DEBUG=pw:webserver yarn test
```

## End-to-End (e2e) Tests

End-to-end tests run directly against a deployed Impromat version (e.g. `dev` or `prod` deployment).

For e2e tests you have to set all environment variables that the `.env.test` env file specifies.

The `COOKIE_SECRET` has to be added to the environment on the server. Session secrets are stored in the `/var/lib/dokku/data/storage` folder - see `infrastructure` package for further details.

For running against a locally running version specify a `.env.test.local` and override the following environment variables:

```
COOKIE_SECRET=[your session secret]
COOKIE_DOMAIN=localhost
BASE_URL=http://localhost:3000/
```

### Automatic Login

If the `REACT_APP_AUTO_LOGIN` environment variable is set, the application simulates an automatic login. This enables integration tests to test all functionalities that require login.

```sh
REACT_APP_AUTO_LOGIN=1 yarn start
```

### Page Object Models

Tests are structured using https://playwright.dev/docs/pom.

## Frameworks

- [open-color](https://github.com/yeun/open-color): for the color palette

## Framework Considerations

- https://avvvatars.com/
