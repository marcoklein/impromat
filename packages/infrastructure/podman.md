# Podman as Docker alternative

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

Or use

```sh
echo "unix://$(podman machine inspect | jq '.[0].ConnectionInfo.PodmanSocket.Path' --raw-output)"
```

Set this in the .env.local
```
DOCKER_HOST="unix:///Users/<user-name>/.local/share/containers/podman/machine/podman-machine-default/podman.sock"
````

## Slow Podman Builds

Podman might be slow if it is using `overlay` as a graph driver (see [this GitHub issue](https://github.com/containers/podman/issues/13226))

```
podman info --debug | grep graphDriverName
```

> If this prints `graphDriverName: overlay` you should switch to `fuse-overlayfs`.

Install for Linux:

```
brew install fuse-overlayfs
```

Install for MacOS:

```
brew install macfuse
```
