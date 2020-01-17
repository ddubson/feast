[![Build Status](https://travis-ci.org/ddubson-feast-app/feast.svg?branch=master)](https://travis-ci.org/ddubson-feast-app/feast)
[![codebeat badge](https://codebeat.co/badges/b17a78c2-c882-4976-b308-7cd50e10a1f4)](https://codebeat.co/projects/github-com-ddubson-feast-app-feast-master)

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
