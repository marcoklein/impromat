> WIP: just some thoughts

# Incremental Build

> You will not get the perfect code. Adapt and refactor when you get to a problem, but not beforehand to avoid over-engineering. At least, if you are still in the "experimenting" phase.

- Refactor on the go
- Make it run first

## Folder structure

Initially I had a very flat folder structure:

```
/src
  /components
    WorkshopComponent.tsx
    WorkshopAddComponent.tsx
    LibraryTabSearchComponent.tsx
    LibraryTabCreateComponent.tsx
    ListItemComponent.tsx
  /pages
    WorkshopPage.tsx
    LibraryPage.tsx
    AboutPage.tsx
  /routes
    shared-routes.ts
  /...
```

Which was very handy in the beginning, because the flat structure would give me a clear overview.
However, with growth of the repository I had to handle more pages and more components. Thus, I changed the folder layout to divide further into pages and components:

```
/src
  /components
    ListItemComponent.tsx
  /pages
    AboutPage.tsx
    /library
      /components
        LibraryTabSearchComponent.tsx
        LibraryTabCreateComponent.tsx
        ...
      LibraryPage.tsx
      library-routes.ts
      ...
    /workshop
      /components
        WorkshopComponent.tsx
        WorkshopAddComponent.tsx
      WorkshopPage.tsx
```

This layout fits to current project size and amount of components and pages.
