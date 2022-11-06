# Impromat Monorepo

## Hoisting

`package.json` defines a `workspaces.nohoist` section to specify glob patterns for certain packages to not be hoisted.

To apply `nohoist` changes use a forced install:

```
yarn install --force
```

## Library Considerations

https://github.com/changesets/changesets/blob/main/packages/cli/README.md
