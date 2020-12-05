![Node.js CI](https://github.com/ddubson/feast/workflows/Node.js%20CI/badge.svg)
[![codebeat badge](https://codebeat.co/badges/6b21a97f-2129-4f59-994e-f2098526e7c6)](https://codebeat.co/projects/github-com-ddubson-feast-main)
[![Maintainability](https://api.codeclimate.com/v1/badges/517ed4cf27196fb7c2b0/maintainability)](https://codeclimate.com/github/ddubson/feast/maintainability)

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

Run `make open-webapp` to launch site in browser

## Practices, Techniques, Tools

- React UI component library: [PrimeReact](https://www.primefaces.org/primereact/)
- Modular typescript approach with Lerna and Yarn workspaces
    - [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- Build management: Self-documenting Makefile
    - [More on self-documenting Makefiles](https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)
- Sass styling approach: **7-1 pattern** 
    - [About 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)
    - [In-depth on 7-1 pattern](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/)
    - [Understanding Sass architecture](https://sass-guidelin.es/#architecture)
