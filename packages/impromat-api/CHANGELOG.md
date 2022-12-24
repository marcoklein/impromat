# Changelog

## 0.5.4

### Patch Changes

- 18fb28b: Fix resolver failing to return favorite elements

## 0.5.3

### Patch Changes

- 459a0a3: Fix replication of users collection.

## 0.5.2

### Patch Changes

- 7c0ea25: Fix basedOn element migration and synchronization.

## 0.5.1

### Patch Changes

- 47eeef2: Fix migrations by adding version fields to all entries.

## 0.5.0

### Minor Changes

- ca9bfdd: Add database migration to version 3.
- Remove obsolete json schema validation
- ca9bfdd: Synchronization of users via the GraphQL `me` query and `pushUsers` mutation.

### Patch Changes

- ca9bfdd: Generate code coverage report for tested files.
- ca9bfdd: Delete json code generation as all types are generated through GraphQL Codegen.

## 0.4.3

### Patch Changes

- 843ba32: Preparing Changelog for changeset automation

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
