#!/bin/bash

function getIdOfPodmanImage {
  local imageTag="$1"
  set -o xtrace
  local imageId=$(sudo podman images --filter reference="$imageTag" --format='{{.ID}} {{.Tag}}' | grep -E ".* $imageTag" --line-regexp | awk -F " " '{print $1}' | head -n 1)
  set +o xtrace
  log "imageId=$imageId"
  echo "$imageId"
}

function buildPodmanImage {
  debug_log "buildPodmanImage()"
  local appName="$1"
  local imageVersion="$2"
  local artifactType="$3"

  local imageTag="$appName:$imageVersion"
  debug_log "imageTag=$imageTag"

  local buildImageId=$(getIdOfPodmanImage "$imageVersion")

  local noCache=""
  if [ "$artifactType" == "release" ]
  then
    noCache="--no-cache"
  fi

  if [ -z "$buildImageId" ]
  then
    log "Building image..."
    set -o xtrace
    sudo podman build --quiet $noCache --file "$WORKDIR/Dockerfile" --label artifactType="$artifactType" --tag "$imageTag" "$WORKDIR/.."
    set +o xtrace
  else
    log "Image with tag $imageTag already build."
  fi
}

function getImageTagOfReleaseType {
  local imageTag="$1"
  local releaseType="$2"
  if [ "$releaseType" == "snapshot" ]
  then
    log "Running a snapshot build"
    randomIdentifier=$(getRandomIdentifier)
    echo "$imageTag-$randomIdentifier"
  elif [ "$releaseType" == "release" ]
  then
    log "Running a release build"
    echo "$imageTag"
  else
    fail "ERROR: provide a valid release type"
  fi
}

function buildImage {
  local appName="$1"
  local version="$2"
  local artifactType="$3"

  [ -z $appName ] && fail "appName missing"
  [ -z $version ] && fail "version missing"
  [ -z $artifactType ] && fail "artifactType missing"

  local imageVersion=$(getImageTagOfReleaseType "$version" "$artifactType")

  buildPodmanImageResult=$(buildPodmanImage "$appName" "$imageVersion" "$artifactType")

  echo "$imageVersion"
}
