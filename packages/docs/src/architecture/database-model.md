- [Client side Entity Relationships](#client-side-entity-relationships)
  - [ER-Diagram](#er-diagram)
  - [Workshop Elements and Elements](#workshop-elements-and-elements)
  - [Custom Elements](#custom-elements)

# Client side Entity Relationships

## ER-Diagram

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

- `me`: Contains a single reference to the currently logged in user object.
- `user`: Stores all users the client needs. This might be friends or the own user object.
- `workshop`: Stores improv workshops.
- `element`: Elements might be part of a workshop and represent improv exercises or games.

## Workshop Elements and Elements

The model holds two types of elements:

1. a **workshop element**, that is an element represented by the workshop. It holds specific information of an element within a workshop, e.g. a note or title.
2. a **base element**, that is either from the Improbib or a custom creation. It holds base information about an element, e.g. description and source information.

```mermaid
erDiagram
    BaseElement ||--o{ WorkshopElement : "uses and overrides"
    Workshop ||--o{ WorkshopElement : contains
    Workshop {
      name string
    }
    BaseElement {
      string name
      string markdown
      string[] tags
      bool public
      string sourceName
    }
    WorkshopElement {
      string name
      string note
    }
```

## Custom Elements

Users can create their own exercises and games by creating custom elements. Custom elements and elements from the Improbib are the two main sources for workshop elements.

To allow easier reuse of custom elements and to avoid duplications there is always one **Single Source of Truth** element represented by the `basedOn` relationship of the `WorskhopElement`.

The following Domain Model describes the `CustomElement` relationship:

```mermaid
classDiagram
  direction LR
  class WorkshopSection {
  }
  class WorkshopElement {
    name: string
    note: string
  }
  class Element {
    name: string
    html: string
  }
  class CustomElement {
  }
  class ImprobibElement {
  }
  WorkshopSection --> WorkshopElement : has
  WorkshopElement --* Element : basedOn
  Element <|-- CustomElement : is
  Element <|-- ImprobibElement : is
```
