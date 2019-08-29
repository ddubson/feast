#!/usr/bin/env bash

pushd api/ || exit
yarn test
yarn build
popd || exit

pushd web/ || exit
yarn test
yarn run build
popd || exit
