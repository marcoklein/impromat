#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/scripts/common.sh

log "Configuring Dokku applications"

log "Configuring ollama"
bash -e $WORKDIR/scripts/configure-ollama.sh production

log "Configuring impromat-app"
bash -e $WORKDIR/scripts/configure-impromat-app.sh production "impromat.app" api.impromat.app

log "Configuring impromat-api"
bash -e $WORKDIR/scripts/configure-impromat-api.sh production api.impromat.app

##################################################
### Resource Limits
##################################################

environmentName=production
dokku resource:limit --cpu 1 ollama-$environmentName
dokku resource:limit --cpu 2 impromat-api-$environmentName
dokku resource:limit --cpu 2 impromat-app-$environmentName