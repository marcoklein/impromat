#!/usr/bin/env bash

# export DEBUG="1"
# export DEBUG_TRACE="1"

export WORKDIR=$(cd $(dirname $0) && pwd)
source $WORKDIR/scripts/common.sh


appName=impromat-grafana-production
domain=monitor.impromat.app
dbName=impromat-grafana-db-production

log "Configure monitoring"

ensureAppExists $appName
dokku config:set --no-restart $appName DOKKU_LETSENCRYPT_SERVER=default
configureDomain $appName $domain

ensurePostgresDatabaseExists $dbName
ensurePostgresDatabaseIsLinked $dbName $appName

echo "CAUTION"
echi "......."
echi "......."
echi "......."
echo "Script WIP, please proceed with manual steps from script file"
echi "......."
echi "......."
echi "......."
echi "......."
exit 1

dokku config $appName
# Set GF_DATABASE_URL
dokku config:set $appName GF_DATABASE_URL='previously_copied_database_url'
dokku config:set $appName GF_DATABASE_URL='postgres://postgres:514d552922fa84f30419538c12797e96@dokku-postgres-impromat-grafana-db-production:5432/impromat_grafana_db_production'

dokku config:set $appName GF_SERVER_HTTP_PORT=5000

dokku config:set $appName GF_SECURITY_SECRET_KEY=$(echo `openssl rand -base64 45` | tr -d \=+ | cut -c 1-32)

# see https://github.com/d1ceward/grafana_on_dokku