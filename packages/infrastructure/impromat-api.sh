#!/bin/bash

ssh -t dokku@impromat.app storage:ensure-directory impromat-api-store-production
ssh -t dokku@impromat.app storage:ensure-directory impromat-api-secrets-production
ssh -t dokku@impromat.app storage:mount impromat-api-production impromat-api-store-production:/app/storage
ssh -t dokku@impromat.app storage:mount impromat-api-production impromat-api-secrets-production:/app/secrets
ssh -t dokku@impromat.app config:set --no-restart impromat-api-production GOOGLE_AUTH_JSON_PATH=/app/secrets/google_key.secret.json
ssh -t dokku@impromat.app config:set --no-restart impromat-api-production STORAGE_PATH=/app/storage

ssh -t dokku@impromat.app ps:restart impromat-api-production
