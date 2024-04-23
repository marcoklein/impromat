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
configureDomain $appName "$domains"
