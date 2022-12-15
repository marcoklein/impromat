# Server Installation

## Installation of Dokku

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

## Swap File

Follow e.g. https://linuxize.com/post/create-a-linux-swap-file/

```
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Append the following line in `/etc/fstab`:

```
/swapfile swap swap defaults 0 0
```

Verify change with:

```
sudo swapon --show
```

or:

```
sudo free -h
```
