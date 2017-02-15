#!/bin/bash
source ~/.nvm/nvm.sh

export NODE_ENV=production

# Get the full path to this file and change to the parent directory
SYS_PATH=$(cd ${0%/*} && pwd -P)
cd $SYS_PATH
cd ..

# Run billing service
./tempstars-scraper.js >> /var/log/tempstars-scraper.log 2>&1
exit 0
