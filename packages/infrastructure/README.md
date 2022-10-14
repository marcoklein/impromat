# Infrastructure

Infrastructure related scripts for setup and management of deployments.

## Getting started

> Warning: some of the scripts are still being worked on and got hard-coded url parameters. This is because scripts were initially not meant for the public. Feel free to improve them.

Install a fresh, empty server

```bash
./install-root.sh impromat <server-ip>
```

> `impromat` is the name of the sudo user that the subsequent installation scripts will use.

Upgrade the distribution (manual steps)

```bash
./upgrade-distribution.sh
```

Install with the created user

```bash
./install.sh <server-ip>
```

Manage the cluster by building and running images on Podman

```bash
./cli.sh
```

> The CLI prints available commands

Create a `.env` file to load the host URL

```
HOST=api.impromat.marcoklein.dev
```

For more logs and easier debugging set the `DEBUG` variable. E.g. in your `.env`

```
DEBUG=1
```

## Server Installation

The `install` folder contains all scripts that are necessary for setting up the global server configuration.
This covers

- `nginx` for reverse proxy configuration
- `ufw` for firewall configuration
- `certbot` for HTTPS certificates through letsencrypt
- `podman` for running containers
- `git` for cloning the repository

## Podman Specifics

Podman secrets reside in the `impromat` user account under `secrets`.

Create Secret

```bash
podman secret create GOOGLE_AUTH_JSON_SECRET ~/secrets/google.auth.json
```

Delete unused image and all attached containers

```bash
podman container rm <image-name> --force
```

List all containers

```bash
podman container list --all
```

Follow logs

```bash
podman logs --follow <container-name>
```

Print cluster statistics

```bash
podman stats
```

## Design Principles

### KISS

Keep it simple stupid is the first principle. Just make it work. No fancy stuff as long as it is unnecessary.

### Run locally

You should be able to run most scripts locally if you have necessary tools installed. This implies a simple, sharable structure of commands.

### Durable

Allow easy maintenance by sticking to the root. In this case it is simple bash scripts and no full blown deployment tool like Ansible, Chef, or others. Introduce them when necessary.
