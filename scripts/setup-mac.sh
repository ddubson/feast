#!/usr/bin/env zsh

set -e
pushd "$(git rev-parse --show-toplevel)" > /dev/null || exit

# Dependencies
brew install postgresql node yarn

# Postgres
brew services start postgresql

psql -h localhost -p 5432 \
  --dbname=postgres \
  --file=scripts/db-setup.sql || exit 0

psql -h localhost -p 5432 \
  --username=feast_sa \
  --dbname=feast_db \
  --file=packages/api/src/store/pg/schema.sql

psql -h localhost -p 5432 \
  --username=feast_sa \
  --dbname=feast_db \
  --file=packages/api/src/store/pg/initial_data.sql

echo 'export PG_CONNECTION_STRING="postgresql://feast_sa@127.0.0.1:5432/feast_db?currentSchema=public"' >> ~/.zprofile


