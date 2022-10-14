#!/bin/bash

###############
#
# Execute the infrastructure CLI on the host machine.
#
###############

userName="$1"
targetPath="$2"

set -o xtrace
cd $targetPath
pwd
ls
./infrastructure/cli.sh "local" "$3" "$4" "$5" "$6" "$7"
rm -r $targetPath
set +o xtrace
