# Dependencies
brew install postgresql
brew install yarn

# Postgres
brew services start postgresql
pqsl postgres

CREATE DATABASE feast_db;
#https://cheatsheets.dmitriydubson.com/databases/postgres/
CREATE ROLE feast_sa WITH LOGIN;
GRANT ALL PRIVILEGES ON DATABASE feast_db to feast_sa;

# Use datagrip for the rest, but optional
psql feast_db -U feast_sa
# Run schema in datagrip, might want to do 1 at a time
# Run seed data

export PG_CONNECTION_STRING="postgresql://feast_sa@127.0.0.1:5432/feast_db?currentSchema=public"
make install build


