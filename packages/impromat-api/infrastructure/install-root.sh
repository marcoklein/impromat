#!/bin/bash

# Interactive script to login as root and setup host machine

# TODO add SSH keys for root as well so you do not have to input password two times
# TODO add private and public SSH key for user so you can reuse them
# OR => print public key to easily distribute

if [ -f .env ]
then
  source .env
fi

sudoUserName=$1
ip="${2:-$HOST}"
publicKey=`cat ~/.ssh/id_rsa.pub`
echo "sudoUserName=$sudoUserName"
echo "ip=$ip"

# for strict host checking: https://stackoverflow.com/questions/3663895/ssh-the-authenticity-of-host-hostname-cant-be-established
ssh root@$ip 'bash -s' < ./install-root/add-user-access.sh "\"$publicKey\"" "$sudoUserName"
ssh root@$ip 'bash -s' < ./install-root/no-passwd-sudo.sh "$sudoUserName"