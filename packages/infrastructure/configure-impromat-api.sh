#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

appName=impromat-api-production
domain="api.impromat.app"
dockerfilePath="packages/infrastructure/Dockerfile-impromat-api"

ensureAppExists $appName
setCommonDockerOptions $appName $dockerfilePath
configureDomain $appName $domain

log "Ensure Storage"
dokku storage:ensure-directory impromat-api-store-production
dokku storage:ensure-directory impromat-api-secrets-production
dokku storage:mount impromat-api-production impromat-api-store-production:/app/storage
dokku storage:mount impromat-api-production impromat-api-secrets-production:/app/secrets

log "Set App Configuration"
dokku config:set --no-restart impromat-api-production GOOGLE_AUTH_JSON_PATH=/app/secrets/google_key.secret.json
dokku config:set --no-restart impromat-api-production STORAGE_PATH=/app/storage