[![Release](https://github.com/marcoklein/impromat/actions/workflows/release.yml/badge.svg)](https://github.com/marcoklein/impromat/actions/workflows/release.yml)

[![website](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fimpromat.app)](https://impromat.app)

# Impromat

Developed by improvisers — made for improvisers. Impromat offers all necessary features to plan your upcoming improv sessions with all fundamental exercises and games. Impromat is meant to be the go to app for improvisational theatre.

Access the app at [impromat.app](https://impromat.app).

## What is the roadmap?

On a visionary level, Impromat should be the supporting application for any improvisational theatre activities.

Our mission is the fostering of knowledge exchange for improv workshops and exercises and build an active global community around it.

As first steps, Impromat will support the workshop facilitation journey from:

1. Planning a Workshop
2. Facilitating the Workshop
3. Sharing the Workshop

For an up-to-date overview see Impromats [Milestones](https://github.com/marcoklein/impromat/milestones?direction=asc&sort=title&state=open).

## How can I contribute?

First of all, by using it, creating new exercises and games and share your workshop creations with the community. Contribute with bug reports or new feature ideas through [issues](https://github.com/marcoklein/impromat/issues/new/choose).

Second of all, Impromat is open-source, thus you can also get your hands dirty and pick a [good first issue](https://github.com/marcoklein/impromat/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for getting started.

## How can I join with coding?

The following section describes the technical quick start for running Impromat locally.

### Prerequisites

- Install [NodeJs](https://nodejs.org/en)
- Install [PostgreSQL](https://www.postgresql.org/) (possible to run via [Docker](https://www.docker.com/) as well)
- Install [Yarn 3](https://yarnpkg.com/getting-started/install)

### Getting started

Clone repository via SSH:

```sh
git clone git@github.com:marcoklein/impromat.git
```

...or via HTTPS

```sh
git clone https://github.com/marcoklein/impromat.git
```

Install all dependencies:

```sh
yarn install
```

Build impromat frontend and impromat backend:

```sh
yarn workspaces foreach --from '{impromat,impromat-api}' run build
```

Run database migrations:

```sh
yarn workspace impromat-api run prisma:migrate
```

Seed database:

```sh
yarn workspace impromat-api run prisma db seed
```

Start the development server for frontend and backend:

```sh
yarn dev
```

Now you should have a running local version of the impromat application at http://localhost:3000.

Explore project graph:

```sh
yarn dlx nx graph
```

The `folke.vscode-monorepo-workspace` extension can list all monorepo extensions in the workspace. Use the following command in the command plate after installation to activate them:

```
>monorepo: Select Workspace Folders
```

## Changelog and Version Bumps

The project uses [changesets](https://github.com/changesets/changesets) for maintaining changelogs and version bumps across packages.

For adding a changeset run the following command from any workspace:

```sh
yarn changeset:add
```

Impromat adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
