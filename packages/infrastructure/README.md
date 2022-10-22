# Infrastructure

Deployment configurations for the monorepo via [Dokku](https://dokku.com).

## Deploying an Application

Add the remote connection and push to Dokku master branch to build

```
git remote add <app-name> dokku@impromat.app:<app-name>
git push <app-name> <branch-name>:master
```

## Persistent Storage

Dokku stores files in `/var/lib/dokku/data/storage`.

## Installation of Dokku

[Installation](./installation.md)

## Letsencrypt Staging Environment

To validate certification retrieval you should use the Letsencrypt staging server with

```
ssh -t dokku@impromat.app config:set --no-restart <app-name> DOKKU_LETSENCRYPT_SERVER=staging
```
