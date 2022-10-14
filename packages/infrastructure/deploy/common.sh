#!/bin/bash

function getRandomIdentifier {
  echo $RANDOM
}

function getPackageVersion {
  grep version package.json | awk -F \" '{print $4}'
}

function log {
  # local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  # echo "$timestamp $*" 1>&2
  echo "$@" 1>&2
}

function debug_log {
  if [ ! -z "$DEBUG" ]
  then
    log DEBUG $@
  fi
}

function error() {
  echo "$@" 1>&2
}

function fail() {
  error "$@"
  exit 1
}

function cli_help() {
    fail "
Command $1
"
}

debug_log "Loaded common"
