- [Client side Entity Relationships](#client-side-entity-relationships)
  - [Collections](#collections)
  - [Client Authorization](#client-authorization)

# Client side Entity Relationships

The following ER-diagram presents an overview of the client-side collections.

```mermaid
erDiagram
    me ||--|| user : references
    me {
    }
    user ||--o{ workshop : has
    user ||--o{ element : favorites
    user {
    }
    workshop {
    }
    workshop ||--|{ element : has
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
