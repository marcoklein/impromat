#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/scripts/common.sh

log "Configuring Dokku applications"

log "Configuring ollama"
# bash -e $WORKDIR/scripts/configure-ollama.sh development

log "Configuring impromat-app"
bash -e $WORKDIR/scripts/configure-impromat-app.sh development "dev.impromat.app" api.dev.impromat.app

log "Configuring impromat-api"
bash -e $WORKDIR/scripts/configure-impromat-api.sh development api.dev.impromat.app

##################################################
### Resource Limits
##################################################

environmentName=development
dokku resource:limit --cpu 0.5 ollama-$environmentName
dokku resource:limit --cpu 0.5 impromat-api-$environmentName
dokku resource:limit --cpu 0.5 impromat-app-$environmentName

##################################################
### Development environment specific configuration
##################################################

appName=impromat-app-development
echo "Adding development configuration"
packageVersion=$(cd $WORKDIR/../impromat && echo $(cat ./package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]'))
echo "packageVersion=$packageVersion"
appVersion="$packageVersion-$(($RANDOM % 999))"
echo "appVersion=$appVersion"
dokku docker-options:add $appName build "--build-arg VITE_VERSION=$packageVersion-$RANDOM"

dokku config:set --no-restart impromat-api-development NO_CRON_JOBS=1