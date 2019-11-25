#!/usr/bin/env bash

./gradlew clean test build

yarn build
yarn test
