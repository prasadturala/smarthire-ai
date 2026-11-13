# SmartHire AI

SmartHire AI is a recruitment platform that helps companies screen, assess, and manage candidate pipelines.

## Project structure

- frontend/ - React user interface (future work)
- backend/ - Express API for authentication, job management and application workflows
- ai-service/ - Python FastAPI service for deeper candidate insights (future work)
- database/ - PostgreSQL schema and setup scripts
- docs/ - project documentation and roadmap
- tests/ - end-to-end and integration test coverage

## Developer 2 backend

This branch contains the backend foundation for the platform, including:

- JWT authentication and role-based authorization
- Job posting and retrieval APIs
- Candidate application flow
- Resume upload and AI summary analysis
- PostgreSQL schema for users, jobs and applications

## Getting started

```bash
cd backend
npm install
npm run test
npm run dev
```

A sample `.env.example` file is included in `backend/` for local configuration.
