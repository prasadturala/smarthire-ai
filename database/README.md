# Database setup

This project uses PostgreSQL for the core application data model.

1. Create the database:
   createdb smarthire
2. Apply the schema:
   psql -d smarthire -f database/smarthire.sql
3. Update the backend `.env` file with your connection string.

The backend service intentionally includes a lightweight in-memory fallback so the API can run without PostgreSQL during local development or validation.
