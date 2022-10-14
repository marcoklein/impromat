#!/bin/bash

echo "***************************************"
echo "***************************************"
echo "Welcome to the Impromat Deployment CLI!"
echo "***************************************"
echo "***************************************"

export WORKDIR=$(cd $(dirname $0) && pwd)
if [ -f $WORKDIR/.env ]
then
  echo "Loading .env"
  source $WORKDIR/.env
fi
export DEBUG=$DEBUG


. $WORKDIR/deploy/common.sh
. $WORKDIR/deploy/build-functions.sh
. $WORKDIR/deploy/run-functions.sh

. $WORKDIR/app_name.config
appName="$APP_NAME"

debug_log "Verbose logging active"

command="$1"
if [ "$command" == "remote" ]
then
  userName="impromat"
  ip="api.impromat.marcoklein.dev"
  targetPath="/home/$userName/uploads/$(date +\"%Y-%m-%d\")_$(getPackageVersion)_$RANDOM"
  ssh $userName@$ip "mkdir -p $targetPath"
  projectDir=$(cd $WORKDIR && cd .. && pwd)
  rsyncVerbose=$([ ! -z $DEBUG ] && echo "--stats -v"; echo "")
  set -o xtrace
  rsync -r \
    "$projectDir/infrastructure" \
    "$projectDir/src" \
    "$projectDir/schema" \
    "$projectDir/package.json" \
    "$projectDir/yarn.lock" \
    "$projectDir/tsconfig.json" \
    $rsyncVerbose \
    $userName@$ip:$targetPath
  set +o xtrace
  ssh $userName@$ip 'bash -s' < $WORKDIR/remote/remote-cli.sh $userName $targetPath $2 $3 $4 $5 $6
elif [ "$command" == "local" ]
then

  command="$2"
  if [ "$command" == "build" ]
  then
    log "Building an image"
    version=$(getPackageVersion)
    artifactType="$3"
    [[ -z "$artifactType" ]] && cli_help "build <artifact-type>"
    debug_log "artifactType=$artifactType"
    buildImageId=$(buildImage "$appName" "$version" "$artifactType")
    debug_log "buildImageId=$buildImageId"
  elif [ "$command" == "run" ]
  then
    imageVersion="$3"
    [[ -z "$imageVersion" ]] && cli_help "run <current|image-version>"

    if [ "$imageVersion" == "current" ]
    then
      imageVersion=$(getPackageVersion)
    fi
    debug_log "imageVersion=$imageVersion"
    runImage "$appName" "$imageVersion"
  elif [ "$command" == "deploy" ]
  then
    artifactType="$3"
    [[ -z "$artifactType" ]] && cli_help "deploy <artifact-type>"

    log "Deploying an image"
    log "Building ..."

    version=$(getPackageVersion)
    debug_log "artifactType=$artifactType"
    imageVersion=$(buildImage "$appName" "$version" "$artifactType")

    log "Running ..."

    debug_log "imageVersion=$imageVersion"
    runImage "$appName" "$imageVersion"
  elif [ "$command" == "cleanup" ]
  then
    log "Deleting all non-running containers"
    set -o xtrace
    sudo podman container prune --force
    set +o xtrace
    log "Deleting unused snapshot images"
    set -o xtrace
    sudo podman image prune \
                --filter label=artifactType=snapshot \
                --force
    set +o xtrace
  else
    echo "
Command local

Commands
  deploy   Build and run an image
  run      Run an image
  build    Build an image
  cleanup  Cleanup all images
"
exit 1
  fi

  
else
  echo "
Commands
  remote   Run scripts on remote machine
  local    Run scripts on local machine
"
exit 1
fi