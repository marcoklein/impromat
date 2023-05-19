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

## Changelog

The project use `changesets` for keeping changelogs and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For adding a changeset run the following command from any workspace:

```
yarn changeset:add
```
