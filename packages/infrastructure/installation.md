# Installation of Dokku

Follow https://dokku.com/docs/getting-started/installation/

```
wget https://raw.githubusercontent.com/dokku/dokku/v0.28.2/bootstrap.sh
sudo DOKKU_TAG=v0.28.2 bash bootstrap.sh
```

```
cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin
dokku domains:set-global impromat.app
```

```
sudo dokku plugin:install https://gitlab.com/notpushkin/dokku-monorepo
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

ssh -t dokku@impromat.app config:set --no-restart --global DOKKU_LETSENCRYPT_EMAIL=hello@marcoklein.dev
```

Prepare app

```
ssh -t dokku@impromat.app config:set impromat-app-production NGINX_ROOT=build
ssh -t dokku@impromat.app domains:set impromat-app-production impromat.app
ssh -t dokku@impromat.app letsencrypt:enable impromat-app-production
```
