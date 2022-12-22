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

Playwright executes end-to-end tests.

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
