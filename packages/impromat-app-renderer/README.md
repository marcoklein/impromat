# Impromat App Renderer

Renders the impromat Single Page Application.

## Getting started

Run with

```
yarn start
```

## Architecture

```mermaid
sequenceDiagram
  participant Client
  participant Prerender Server
  participant Client App

  Client->>Prerender Server: Request
  Prerender Server->>Client App: Request
  Client App-->>Prerender Server: Response
  Prerender Server-->>Client: Response
```

## Inspiration

https://dev.to/3atwaa/ionic-ssr-with-react-an-adventure-1b3f
