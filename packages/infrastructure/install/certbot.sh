#!/bin/bash

echo "certbot.sh"

if [ -z "$(which certbot)" ]
then
  echo "Installing certbot"
  #https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
  sudo snap install core
  sudo snap refresh core
  sudo snap install --classic certbot
  sudo ln -s /snap/bin/certbot /usr/bin/certbot

  echo "--------------------------------------"
  echo "MANUAL STEP FOR CERTIFICATE ENABLEMENT"
  echo "RUN sudo certbot --nginx"
  echo "--------------------------------------"
fi
