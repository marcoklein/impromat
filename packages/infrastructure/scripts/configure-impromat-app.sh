#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

environmentName=$1
domains=$2
apiUrl=$3

appPrefix=impromat-app
appName=$appPrefix-$environmentName
dockerfilePath="packages/infrastructure/Dockerfile-impromat-app"
echo "environmentName=$environmentName"
echo "appPrefix=$appPrefix"
echo "appName=$appName"
echo "domains=$domains"

ensureAppExists $appName
setCommonDockerOptions $appName $dockerfilePath
configureDomain $appName "$domains"

log "Set App Configuration"
dokku config:set --no-restart $appName REACT_APP_API_URL=https://$apiUrl

log "Set Docker Options"
dokku docker-options:clear $appName build
dokku docker-options:add $appName build "--build-arg REACT_APP_API_URL=https://$apiUrl"
