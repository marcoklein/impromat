#!/usr/bin/env bash

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

environmentName=$1
domain="$2"
apiUrl=$3

appPrefix=impromat-app
appName=$appPrefix-$environmentName
dockerfilePath="packages/infrastructure/Dockerfile-impromat-app"
echo "appPrefix=$appPrefix"
echo "appName=$appName"
echo "domain=$domain"

ensureAppExists $appName
setCommonDockerOptions $appName $dockerfilePath
configureDomain $appName $domain

log "Set App Configuration"
dokku config:set --no-restart $appName REACT_APP_API_URL=https://$apiUrl

log "Set Docker Options"
dokku docker-options:clear $appName build
dokku docker-options:add $appName build "--build-arg REACT_APP_API_URL=https://$apiUrl"

if [ $environmentName="development" ]
then
  packageVersion=$(cd $WORKDIR/../impromat && echo $(cat ./package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]'))
  echo "packageVersion=$packageVersion"
  appVersion="$packageVersion-$RANDOM"
  echo "appVersion=$appVersion"
  dokku docker-options:add $appName build "--build-arg REACT_APP_VERSION=$packageVersion-$RANDOM"
fi