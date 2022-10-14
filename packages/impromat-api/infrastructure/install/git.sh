#!/bin/bash

echo "git.sh"

if [ ! $(which git) ]
then
  echo "Installing Git"
  sudo apt-get -y update
  sudo apt-get -y install git
fi

touch  ~/.ssh/known_hosts
if grep -q "github.com" ~/.ssh/known_hosts
then
  echo "Trusting github.com"
else
  ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
fi 
