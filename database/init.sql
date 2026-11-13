-- Initialize PostgreSQL with required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Run base schema
\i /docker-entrypoint-initdb.d/../database/schema.sql
