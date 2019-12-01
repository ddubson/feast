[![Maintainability](https://api.codeclimate.com/v1/badges/517ed4cf27196fb7c2b0/maintainability)](https://codeclimate.com/github/ddubson/feast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/517ed4cf27196fb7c2b0/test_coverage)](https://codeclimate.com/github/ddubson/feast/test_coverage)
[![Build Status](https://travis-ci.org/ddubson/feast.svg?branch=master)](https://travis-ci.org/ddubson/feast)

# feast

Recipe aggregator app. You can find it deployed on Heroku @ https://bit.ly/feast-app

## Web (React / Typescript with PurifyTS)

### Running & Building

- run local: `yarn start` -> port `1234`
- run test: `yarn test`
- build bundle: `yarn build` -> build artifacts in `dist/` folder

## Deploying to Heroku

Web app uses the `heroku-buildpack-static` buildpack. This buildpack uses `static.json` file as config

https://github.com/heroku/heroku-buildpack-static
