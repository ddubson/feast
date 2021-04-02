![Feast CI Pipeline](https://github.com/ddubson/feast/workflows/Feast%20CI%20Pipeline/badge.svg)
[![codebeat badge](https://codebeat.co/badges/6b21a97f-2129-4f59-994e-f2098526e7c6)](https://codebeat.co/projects/github-com-ddubson-feast-main)
[![Maintainability](https://api.codeclimate.com/v1/badges/517ed4cf27196fb7c2b0/maintainability)](https://codeclimate.com/github/ddubson/feast/maintainability)

# feast

Recipe management app mostly in Typescript.

The composition of this repository is as follows:

- web app - React & Typescript
- api - Express & Typescript
- domain - Typescript

Composition made possible by: Lerna + Yarn workspaces

## Tools required

- GNU Make
- Node 15.x+
- Yarn 1.20+
- PostgreSQL 13.x

## Getting started

### MacOS

Run Makefile target:

```
make setup-mac
```

Sets up yarn, and a fresh database with seed data

### Database initialization

The database in this project is PostgreSQL 13.x.

### [Optional] Installing Postgres on MacOS

The best way is to use Homebrew:

```bash
# Install postgres locally
brew install postgresql

# Start Postgres locally on port 5432
brew services start postgresql

# Use Postgres client to connect to default database
psql postgres
```

The schema for the datase is located [here](https://github.com/ddubson/feast/blob/main/packages/api/src/store/pg/schema.sql)
and some initial data is located [here](https://github.com/ddubson/feast/blob/main/packages/api/src/store/pg/initial_data.sql)

The following connection string env variable is required to run the API locally:

```shell
export PG_CONNECTION_STRING=postgresql://feast_sa@127.0.0.1:5432/feast_db?currentSchema=public
```

The connection is based on a Feast Service Account (`feast_sa`) user that has access to
`feast_db` Database, using the `public` default schema.

### Build check

To verify that everything builds fine, run:

```shell
make install build
```

## Web App

### Running & Building

> On Windows, run `npm install --global --production windows-build-tools` from an elevated shell to install required
> runtime tools to be able to install `node-gyp` transitive dependency

Run:

```
make install web-start
```

## Practices, Techniques, Tools

- React UI component library: [PrimeReact](https://www.primefaces.org/primereact/)
- React state management: React Context API + React Hooks
    - [React Hooks examples](https://usehooks.com/)
- Modular typescript approach with Lerna and Yarn workspaces
    - [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
    - [Publishing packages to GitHub Packages with Yarn + Lerna](https://viewsource.io/publishing-and-installing-private-github-packages-using-yarn-and-lerna/)
- Build management: Self-documenting Makefile
    - [More on self-documenting Makefiles](https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)
- Sass styling approach: **7-1 pattern**
    - [About 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)
    - [In-depth on 7-1 pattern](https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/)
    - [Understanding Sass architecture](https://sass-guidelin.es/#architecture)
- Code linting by ESLint Typescript
- Logging framework: Winston
- Data store with PostgreSQL and Pg Node client library
    - Using client pooling for connection management
    - [Using transactions for multi-query requests](https://node-postgres.com/features/transactions)

## Design Choices
- Jan 2021 (ish) - Opted to name the pages "scenes" after this blog post ... 
- State Management: React Context API a simple solution to sharing state between components ...