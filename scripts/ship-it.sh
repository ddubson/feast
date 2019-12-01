#!/usr/bin/env bash

set -e

yarn lint
yarn build
yarn test
