# Impromat End-to-End Tests

## Getting started

Install docker and colima (container runtime as an alternative to Docker Desktop):

```
brew install docker
brew install colima
brew install docker-compose
```

Install docker compose (e.g. if `docker compose` is not working) follow [this documentation](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually).
In summary, create a symlink to the dockes-compose plugin:

```
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
ln ln /usr/local/bin/docker-compose
```

Start the environment:

```
colima start
```

For MacOS > 13 start colima with `virtiofs` and `vz`:

```
colima start --mount-type virtiofs --vm-type vz
```

## References

- https://gist.github.com/kaaquist/dab64aeb52a815b935b11c86202761a3
