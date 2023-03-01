#!/bin/bash

port=$(podman system connection list --format=json | jq '.[0].URI' | sed -E 's|.+://.+@.+:([[:digit:]]+)/.+|\1|')
userId=$(id -u)
echo "Port: $port"
rm -f /tmp/podman.sock

set -o xtrace
ssh -i ~/.ssh/podman-machine-default -p $port -L"/tmp/podman.sock:/run/user/$userId/podman/podman.sock" -N core@localhost
