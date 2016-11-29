#!/bin/bash

export NODE_ENV=dev

# Get the full path to this file and change to the parent directory
SYS_PATH=$(cd ${0%/*} && pwd -P)
cd $SYS_PATH
cd ..

# Run notifier service
./tempstars-notifier.js >> /var/log/tempstars-notifier.log 2>&1
exit 0
