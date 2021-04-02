CREATE DATABASE feast_db;

CREATE ROLE feast_sa WITH LOGIN;

GRANT ALL PRIVILEGES ON DATABASE feast_db to feast_sa;

\connect feast_db;

GRANT USAGE ON SCHEMA "public" TO feast_sa;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "public" to feast_sa;