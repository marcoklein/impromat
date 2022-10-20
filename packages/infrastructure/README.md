# Infrastructure

Configurations related to deployment and hosting of all packages.

## Usage

## Persistent Storage

Dokku stores files in `/var/lib/dokku/data/storage`.

## Installation of Dokku

[Installation](./installation.md)

## Adding an Application

Add the remote connection and push to dokku master branch to build

```
ssh -t dokku@impromat.app apps:create <app-name>
git remote add <app-name> dokku@impromat.app:<app-name>
git push <app-name> <branch-name>:master
ssh -t dokku@impromat.app domains:set <app-name> <domain>
ssh -t dokku@impromat.app letsencrypt:enable <app-name>
```

## Letsencrypt Staging Environment

To validate certification retrieval you should use the Letsencrypt staging server with

```
ssh -t dokku@impromat.app config:set --no-restart <app-name> DOKKU_LETSENCRYPT_SERVER=staging
```
