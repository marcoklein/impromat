#!/bin/bash

echo "podman.sh"

if [ -z "$(which podman)" ]
then
  echo "Installing Podman"
  sudo apt-get -y update
  sudo apt-get -y install podman
  sudo podman info
fi

# Only necessary for rootless podman
# systemdJournalInGroups=$(groups | grep "systemd-journal")
# if [ -z "$systemdJournalInGroups" ]
# then
#   echo "Adding podman user to systemd-journal group to allow container logs command"
#   echo "This should be fixed with Podman version 4.x.x"
#   echo "See https://github.com/containers/podman/issues/15159#issuecomment-1203851953"

#   sudo usermod -a -G systemd-journal impromat
# fi
