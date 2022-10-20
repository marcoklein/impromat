#!/bin/bash

appName=impromat-app-production
ssh -t dokku@impromat.app config:set --no-restart $appName REACT_APP_API_URL=https://api.impromat.app
ssh -t dokku@impromat.app docker-options:add $appName build "--build-arg REACT_APP_API_URL=https://api.impromat.app"
ssh -t dokku@impromat.app builder-dockerfile:set $appName dockerfile-path Dockerfile-impromat
ssh -t dokku@impromat.app builder:set $appName selected dockerfile
#
# deploy...
#
ssh -t dokku@impromat.app domains:set $appName impromat.app
ssh -t dokku@impromat.app letsencrypt:enable $appName


ssh -t dokku@impromat.app config:unset --no-restart $appName DOKKU_DOCKERFILE_PORTS PORT
ssh -t dokku@impromat.app proxy:ports-clear $appName

# ssh -t dokku@impromat.app config:set --no-restart $appName PROCFILE=packages/infrastructure/impromat/Procfile
# ssh -t dokku@impromat.app ps:set $appName procfile-path packages/infrastructure/impromat/Procfile

# ssh -t dokku@impromat.app config:unset --no-restart $appName DOKKU_PROXY_PORT_MAP
# ssh -t dokku@impromat.app ps:rebuild impromat-app-production

# export DOKKU_APP_RESTORE='1'
# export DOKKU_APP_TYPE='dockerfile'
# export DOKKU_DOCKERFILE_PORTS='5000'
# export DOKKU_PROXY_PORT='80'
# export DOKKU_PROXY_PORT_MAP='http:5000:5000'
# export GIT_REV='42ec64f2056412baaf29f9fdc4e3e37345591ac7'
# export NGINX_ROOT='build'
# export REACT_APP_API_URL='https://api.impromat.app'