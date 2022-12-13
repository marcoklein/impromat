# Release Strategy

The following document describes the release flow and its considerations.

## Environments

The server hosts a `development` and a `production` environment.

The `development` environment is the staging environment and contains the build that would next be released on `production`. You might think of it as being the staging, integration, or pre-production environment.

The app is hosted on https://dev.impromat.app and the api on https://api.dev.impromat.app

`production` hosts everything that is live to all users on the internet.

It is hosted on https://impromat.app and https://api.impromat.app respectively.

## Release Flow

The `main` branch represents the `production` environment and the `dev` branch represents the `development` environment.

Thus, all changes merged into `main` are automatically deployed to `production` and all changes merged into `dev` are automatically deployed to `development`.
