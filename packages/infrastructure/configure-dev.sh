#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

log "Configuring Dokku applications"

log "Configuring impromat-app"
bash -e $WORKDIR/configure-impromat-app.sh development dev.impromat.app api.dev.impromat.app
ssh -t dokku@impromat.app docker-options:report impromat-app-development

log "Configuring impromat-api"
bash -e $WORKDIR/configure-impromat-api.sh development api.dev.impromat.app
