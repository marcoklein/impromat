#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/scripts/common.sh

log "Configuring Dokku applications"

log "Configuring Development"
bash -e $WORKDIR/configure-development.sh

log "Configuring Production"
bash -e $WORKDIR/configure-production.sh

