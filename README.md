# Impromat Monorepo

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

## Library Considerations

https://github.com/changesets/changesets/blob/main/packages/cli/README.md
