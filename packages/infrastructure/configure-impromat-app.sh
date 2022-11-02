#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

appName=impromat-app-production
domain="impromat.app"
dockerfilePath="packages/infrastructure/Dockerfile-impromat-app"

ensureAppExists $appName
setCommonDockerOptions $appName $dockerfilePath
configureDomain $appName $domain

log "Set App Configuration"
dokku config:set --no-restart $appName REACT_APP_API_URL=https://api.impromat.app

log "Set Docker Options"
dokku docker-options:add $appName build "--build-arg REACT_APP_API_URL=https://api.impromat.app"