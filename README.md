[![Release](https://github.com/marcoklein/impromat/actions/workflows/release.yml/badge.svg)](https://github.com/marcoklein/impromat/actions/workflows/release.yml)

[![website](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fimpromat.app)](https://impromat.app)

# Impromat

Improvisational theatre app at https://impromat.app.

> Impromat is in the process of being open sourced. Documentation might be out of date. Feel free to support with an [issue](https://github.com/marcoklein/impromat/issues) or PR for running the repository.

## Prerequisites

- Install [NodeJs](https://nodejs.org/en)

## Getting started

Install all dependencies:

```
yarn install
```

Generate necessary code

```
yarn codegen
```

Start the development server for frontend and backend:

```
yarn dev
```

Explore project graph:

```
yarn dlx nx graph
```

The `folke.vscode-monorepo-workspace` extension can list all monorepo extensions in the workspace. Use the following command in the command plate after installation to activate them:

```
>monorepo: Select Workspace Folders
```

## Changelog and Version Bumps

The project uses [changesets](https://github.com/changesets/changesets) for maintaining changelogs and version bumps across packages.

For adding a changeset run the following command from any workspace:

```
yarn changeset:add
```

Impromat adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
