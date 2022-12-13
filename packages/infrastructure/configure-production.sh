#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/scripts/common.sh

log "Configuring Dokku applications"

log "Configuring impromat-app"
bash -e $WORKDIR/scripts/configure-impromat-app.sh production "start.impromat.app impromat.app" api.impromat.app

log "Configuring impromat-api"
bash -e $WORKDIR/scripts/configure-impromat-api.sh production api.impromat.app
