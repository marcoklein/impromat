# Installation of Dokku

Follow https://dokku.com/docs/getting-started/installation/

```
wget https://raw.githubusercontent.com/dokku/dokku/<version>/bootstrap.sh
sudo DOKKU_TAG=<version> bash bootstrap.sh
```

Add own ssh key to authorized keys

```
cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin
dokku domains:set-global impromat.app
```
