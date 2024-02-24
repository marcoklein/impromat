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

Run storybook with

```
yarn run-storybook
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

Run only unit tests via

```sh
yarn test:unit
```

Update snapshots via

```sh
yarn test:unit:update-snapshots
```

For all other tests you have to start the backend infrastructure.

### Start backend infrastructure

Start test infrastructure via

```sh
yarn test:backend-up
```

Alternatively, run the backend and database locally and change `.env.test` to point to the local API endpoint:

```sh
yarn workspace impromat-api dev
```

And `.env.test.local`:

```sh
VITE_API_URL=http://localhost:8080
```

### Run tests

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

```sh
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

## Dependency Management

We use `depcheck` for verifying dependencies. Run the following command to check for unused dependencies:

```sh
yarn deps:check
```

### Page Object Models

Tests are structured using https://playwright.dev/docs/pom.

## Dependency Cruiser

For visualizations you have to install `graphviz`:

```
brew install graphviz
```

```
yarn deps:visualize
```

## Frameworks

- [open-color](https://github.com/yeun/open-color): for the color palette

## Framework Considerations

- https://avvvatars.com/
