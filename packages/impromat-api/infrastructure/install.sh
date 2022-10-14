#!/bin/bash

dirname=$(dirname $BASH_SOURCE)
echo "dirname=$dirname"
if [ -f $dirname/.env]
then
    source $dirname/.env
fi

echo "HOST=$HOST"

ip="${1:-$HOST}"
echo "ip=$ip"
[ -z "$ip" ] && echo "Please provide an ip" && exit 1

sudoUserName="impromat"

[ -f $dirname/bundle.ignore.sh ] && rm $dirname/bundle.ignore.sh
touch $dirname/bundle.ignore.sh

cat $dirname/install/podman.sh \
    $dirname/install/git.sh \
    $dirname/install/nginx.sh \
    $dirname/install/certbot.sh \
    > $dirname/bundle.ignore.sh

ssh $sudoUserName@$ip 'bash -s' < $dirname/bundle.ignore.sh

echo "INFO: the ./install/nginx-config.sh script is not yet in the install flow. Execute steps in there manually."