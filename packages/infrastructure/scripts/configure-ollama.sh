#!/usr/bin/env bash

# Information on Docker image: https://hub.docker.com/r/ollama/ollama

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/common.sh

environmentName=$1

appPrefix=ollama
appName=$appPrefix-$environmentName
imageName=ollama/ollama:0.1.32
echo "appPrefix=$appPrefix"
echo "appName=$appName"

ensureAppExists $appName
ensureNetworkExists "ollama-bridge-$environmentName"
set +e
dokku git:from-image $appName $imageName
set -e

dokku network:set ollama-$environmentName attach-post-create ollama-bridge-$environmentName

log "Ensure Storage"
dokku storage:ensure-directory ollama-$environmentName
set +e
dokku storage:mount ollama-$environmentName /var/lib/dokku/data/storage/ollama-$environmentName:/root/.ollama
set -e

log "Initialize Ollama"
dokku ps:start ollama-$environmentName
dokku enter ollama-$environmentName web ollama --version
dokku enter ollama-$environmentName web ollama pull mistral
dokku enter ollama-$environmentName web ollama pull marco/em_german_mistral_v01
dokku enter ollama-$environmentName web ollama cp marco/em_german_mistral_v01 mistral-de

dokku resource:limit --cpu 1.5 ollama-$environmentName

dokku ps:restart ollama-$environmentName
dokku ps:stop ollama-$environmentName

log "Ollama finished"