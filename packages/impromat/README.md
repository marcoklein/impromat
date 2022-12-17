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

Publish to GitHub Pages

```
yarn deploy
```

## Logging

We use `debug` for logging. Enable logging for tests via

```
DEBUG="impromat:*" yarn test
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

### Automatic Login

If the `REACT_APP_AUTO_LOGIN` environment variable is set, the application simulates an automatic login. This enables integration tests to test all functionalities that require login.

### Page Object Models

Tests are structured using https://playwright.dev/docs/pom.

## Frameworks

- [open-color](https://github.com/yeun/open-color): for the color palette

## Framework Considerations

- https://avvvatars.com/
