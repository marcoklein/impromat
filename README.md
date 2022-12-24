# Impromat Monorepo

## Getting started

The `folke.vscode-monorepo-workspace` extension can list all monorepo extensions in the workspace. Use the following command in the command plate after installation to activate them:

```
>monorepo: Select Workspace Folders
```

Install all dependencies:

```
yarn install
```

Start the development server for frontend and backend:

```
yarn dev
```

Explore project graph:

```
yarn nx graph
```

## Changelog

The project use `changesets` for keeping changelogs and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The [Roadmap](./ROADMAP.md) tracks upcoming features.

For adding a changeset locally use:

```
yarn changeset
```

## Hoisting

`package.json` defines a `workspaces.nohoist` section to specify glob patterns for certain packages to not be hoisted.

To apply `nohoist` changes use a forced install:

```
yarn install --force
```
