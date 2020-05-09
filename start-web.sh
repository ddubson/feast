#!/usr/bin/env bash

yarn install || exit

./node_modules/.bin/concurrently \
  --names web,server --prefix-colors cyan,green \
  "yarn start:web" "yarn start:server"
