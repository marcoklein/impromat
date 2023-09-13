# Bun as alternative to NodeJS

https://bun.sh/docs/installation#macos-and-linux

```sh
brew tap oven-sh/bun
brew install bun
```

Configure workspaces ([see docs](https://bun.sh/docs/install/workspaces)):

```json
{
  "workspaces": ["packages/*"]
}
```

Change most `package.json` with bun command.

There seems to be an open issue about working with monorepos: https://github.com/oven-sh/bun/issues/533

## Bun types

```sh
bun add -d bun-types
```

In `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["bun-types"]
  }
}
```

### Linking of local dependencies

See https://bun.sh/docs/cli/install#local-packages-bun-link

Original entry in `package.json`:

```json
  // ...
  "improbib": "workspace:^",
  // ...
```

Register by running link command in target package:

```sh
bun link
```

Link in target package via:

```sh
bun link impromat-ai
```

This will update the `package.json`:

```json
  "improbib": "link:improbib",
  "impromat-ai": "link:impromat-ai",
```

### Testing

There is no alternative for to the [jest-mock-extended](https://github.com/marchaos/jest-mock-extended/blob/master/README.md) plugin yet.

Can drop several dependencies:

```sh
bun remove jest jest-junit jest-mock-extended ts-jest
```

There is no `toHaveBeenCalledWith()` function yet. Alternative is directly accessing the mock object:

```ts
expect(elementService.findElements.mock.calls[0]).toEqual([
  userRequestId,
  {
    filter: {},
    orderBy: { notImplemented: true },
    take: 100,
    skip: 0,
  },
]);
```

See [open issue](https://github.com/oven-sh/bun/issues/4365)

TODO: get admin.service.test running

```sh
bun test admin.service
```
