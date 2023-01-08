# Using RxDB with React

## Readonly State

You want to avoid state changes including arrays. Therefore, use `ReadonlyArray` where possible.

```ts
interface ContainerProps {
  tags: ReadonlyArray<string> | null | undefined;
}
```

## Use Readonly Documents Only

> As I had some issues with the immutable state management that React `useState` hooks assume, I had to refactor the approach of how to leverage RxDB within my application.

For retrieval of an object use `.toJSON()` to fetch a readonly object.
Use `DeepReadonlyObject` type in TypeScript to avoid accidental mutations.
