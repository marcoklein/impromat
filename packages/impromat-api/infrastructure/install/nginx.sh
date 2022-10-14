#!/bin/bash

echo "nginx.sh"

if [ -z "$(which nginx)" ]
then
  echo "Installing Nginx"
  sudo apt-get -y update
  sudo apt-get -y install nginx
fi

firewallStatus="$(sudo ufw status)"
if echo "$firewallStatus" | grep -q "inactive"
then
  echo "Enabling firewall"
  sudo ufw allow 'Nginx Full'
  sudo ufw allow ssh
  yes | sudo ufw enable
fi

if [ -z "$(which snap)" ]
then
  echo "Installing snapd"
  sudo apt-get -y update
  sudo apt-get -y install snapd
fi
