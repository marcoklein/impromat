# Impromat End-to-End Tests

## Getting started

Install podman

```
prew install podman
```

Start machine

```
podman machine init
podman machine start
```

Get socket information

```
podman machine inspect
```

Connection info will look like this:

````json
"ConnectionInfo": {
  "PodmanSocket": {
    "Path": "/Users/<user-name>/.local/share/containers/podman/machine/podman-machine-default/podman.sock"
  }
},
```

Set this in the .env.test.local
```
DOCKER_HOST="unix:///Users/<user-name>/.local/share/containers/podman/machine/podman-machine-default/podman.sock"
TESTCONTAINERS_RYUK_DISABLED="true"
````

## Docker Compose

```
brew install docker-compose
```

## References

- https://gist.github.com/kaaquist/dab64aeb52a815b935b11c86202761a3
