[![Build Status](https://travis-ci.org/ddubson-feast-app/feast.svg?branch=master)](https://travis-ci.org/ddubson-feast-app/feast)
[![codebeat badge](https://codebeat.co/badges/b17a78c2-c882-4976-b308-7cd50e10a1f4)](https://codebeat.co/projects/github-com-ddubson-feast-app-feast-master)

# feast

Recipe aggregator app. You can find it deployed on Netlify @ https://bit.ly/feast-web

The composition of this repository is as follows:

- web app - React & Typescript
- api - Express & Typescript
- domain - Typescript

Composition made possible by: Lerna + Yarn workspaces

## Tools required

- GNU Make
- Node 15.x+
- Yarn 1.20+

## Getting started

TODO

## Web (React / Typescript with PurifyTS)

### Running & Building

> On Windows, run `npm install --global --production windows-build-tools` from an elevated shell to install required 
> runtime tools to be able to install `node-gyp` transitive dependency

Run:

```
make start
```

## Deployment

[Netlify Site](https://app.netlify.com/sites/feast-web/overview)

Run `make open.webapp` to launch site in browser

## Practices

- Sass styling approach: **7-1 pattern** 
    - [About 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)
    - [In-depth on 7-1 pattern](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/)
    - [Understanding Sass architecture](https://sass-guidelin.es/#architecture)
