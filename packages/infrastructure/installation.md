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

### Setup PostgreSQL plugin

Following the [official PostgreSQL plugin](https://github.com/dokku/dokku-postgres) for Dokku:

```
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
```

## Swap File

> Note: the following section describes how to create a swap _file_. You might want to create a swap _partition_ for faster access.

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

## Monitoring

Install `htop` with:

```
sudo apt install htop
```

Monitor server with:

```
sudo htop
```
