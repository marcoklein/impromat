#!/bin/bash

userName=$1
sudoersLine="$userName ALL=(ALL) NOPASSWD: ALL"
echo "userName=$userName"
echo "sudoersLine=$sudoersLine"

if grep -q "$sudoersLine" /etc/sudoers
then
  echo "/etc/sudoers up to date already"
else
  echo "Change /etc/sudoers"
  echo "$sudoersLine" | EDITOR='tee -a' visudo
fi
