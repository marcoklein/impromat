- [Client side Entity Relationships](#client-side-entity-relationships)
  - [Collections](#collections)
  - [Client Authorization](#client-authorization)
  - [Workshop Elements and Elements](#workshop-elements-and-elements)

# Client side Entity Relationships

The following ER-diagram presents an overview of the client-side collections.

```mermaid
erDiagram
    me ||--|| user : references
    me {
    }
    user ||--o{ workshop : manages
    user ||--o{ element : favorites
    user {
    }
    workshop {
    }
    workshop ||--|{ element : contains
    element {
    }
```

## Collections

- `me`: Contains a single reference to the currently logged in user object.
- `user`: Stores all users the client needs. This might be friends or the own user object.
- `workshop`: Stores improv workshops.
- `element`: Elements might be part of a workshop and represent improv exercises or games.

## Client Authorization

Verify that the user is still logged in.

```mermaid
flowchart TD
    S[Start App with logged in User] --> L{Logged In?}
    L -->|Yes| P[Pull Login Info from Server]
    P --> C{Connection?}
    C -->|Yes| V{Login Valid?}
    V -->|Yes| R
    C -->|No| R[Retry after x Minutes]
    V -->|No| O[Logout]
```

> TODO add process to logout if there has been no connection for a too long timeframe.

## Workshop Elements and Elements

The model holds two types of elements:

1. a **workshop element**, that is an element represented by the workshop. It holds specific information of an element within a workshop, e.g. a note, a title.
2. a **base element**, that is either from the Improbib or a custom creation. It holds base information about an element, e.g. description and source information.

```mermaid
erDiagram
    baseElement ||--o{ workshopElement : "uses and overrides"
    workshop ||--o{ workshopElement : contains
    workshop {
      name string
    }
    baseElement {
      string name
      string markdown
      string[] tags
      bool public
      string sourceName
    }
    workshopElement {
      string name
      string note
    }
```
