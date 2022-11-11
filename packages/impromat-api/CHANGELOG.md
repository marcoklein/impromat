# Changelog

## 0.4.2

- Fix uninitialized server

## 0.4.1

- Fix infrastructure deployment

## 0.4.0

- Added a common set of schema validation with json schema
- Allow usage of `sections` for workshops

## 0.3.0

- Allow environment configuration for max session time via `SESSION_MAX_AGE`
- Increase default session expiration from 1 day to 1 year

## 0.2.0

- Cli tool to manage infrastructure via `yarn infra <command>`
- Google authentication
- Tests for authentication and replication
- File based storing of workshops
- Upgrade to RxDB 13 new replication protocol
- Build and run images using `Podman` due to the licensing of Docker and to try out Podman as an alternative.
- Load Google secrets from file or environment variable
- Bash scripts to install server
- Build snapshot image on pull request
- Deploy release version to server on PR merge

## 0.1.0

- Basic GraphQL server
