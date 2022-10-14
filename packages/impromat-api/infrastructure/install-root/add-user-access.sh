#!/bin/bash

publicKey="$1"
userName="$2"
verbose="$3"

echo "userName=$userName"
echo "verbose=$verbose"

[ -n "$verbose" ] && echo "Verbose output"

if grep -q $userName /etc/passwd
then
  echo "User $userName exists"
else
  echo "Adding new user"
  useradd -m -d /home/$userName -s /bin/bash $userName
  echo "Adding new user to sudoer group"
  usermod -a -G $userName
fi

echo "Switching to user"
su $userName <<EOF
  echo "Switched to user $userName"
  if [ -f ~/.ssh/id_rsa ]
  then
    echo "SSH keys exist"
  else
    echo "Generating SSH key"
    ssh-keygen
  fi

  if [ ! -f ~/.ssh/authorized_keys ]
  then
    echo "Touching ~/.ssh/authorized_keys"
    touch ~/.ssh/authorized_keys
  fi

  if grep -q "$publicKey" $authorizedKeysFile
  then
    echo "Authorized key exists"
  else
    echo "Copying authorized key"
    echo "$publicKey" >> ~/.ssh/authorized_keys
    [ -n "$verbose" ] && echo "Authorized keys:"
    [ -n "$verbose" ] && cat ~/.ssh/authorized_keys
  fi
EOF
