#!/bin/bash

function runImage {
  debug_log "runImage()"
  local appName="$1"
  local imageVersion="$2"

  [ -z $appName ] && fail "appName missing"
  [ -z $imageVersion ] && fail "imageVersion missing"
  debug_log "appName=$appName"
  debug_log "imageVersion=$imageVersion"

  local imageTag="$appName:$imageVersion"
  debug_log "imageTag=$imageTag"
  local buildImageId=$(getIdOfPodmanImage "$imageVersion")
  debug_log "buildImageId=$buildImageId"
  [ -z $buildImageId ] && fail "Image with tag $imageTag not build. Run the build command before running the image."

  # TODO make this a paramter when we run containers on different ports
  port="8080"
  containersOnPort=$(sudo podman container ls --format "{{.ID}} {{.Ports}}" | grep "0.0.0.0:8080")
  if [ ! -z "$containersOnPort" ]
  then
    log "Stopping container on Port 8080"
    containerId=$(echo "$containersOnPort" | awk -F " " '{print $1}')
    set -o xtrace
    sudo podman stop $containerId
    sudo podman wait $containerId
    set +o xtrace
  fi

  if [ ! -d "/home/impromat/store-production" ]
  then
    log "Create store-production folder for volume mount"
    mkdir /home/impromat/store-production
  fi

  set -o xtrace
  sudo podman run --publish 8080:8080/tcp \
              --env="NODE_ENV=production" \
              --env="VERSION=$imageVersion" \
              --env="STORAGE_PATH=/storage" \
              --secret="GOOGLE_AUTH_JSON_SECRET" \
              --volume="/home/impromat/store-production:/storage" \
              --env="GOOGLE_AUTH_JSON_PATH=/run/secrets/GOOGLE_AUTH_JSON_SECRET" \
              --detach \
              --rm \
              "$buildImageId"
  set +o xtrace

  echo "$buildImageId"
}