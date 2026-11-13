# SmartHire AI

SmartHire AI is an AI-powered recruitment platform for managing job pipelines, candidate applications, and resume review workflows.

## Project structure

- frontend/ - React user interface for candidates and recruiters
- backend/ - Express API for auth, jobs, applications, and resume analysis orchestration
- ai-service/ - Python FastAPI service that scores resumes and suggests match quality
- database/ - PostgreSQL schema and setup guidance
- docs/ - project roadmap and technical notes

## Final integrated workflow

1. Start the AI service:
   ```bash
   cd ai-service
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
2. Start the backend API:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev -- --host 0.0.0.0
   ```

## Included features

- Candidate and recruiter authentication flows
- Job listing and application management
- Resume upload and AI assessment integration
- PostgreSQL-ready database schema
- Role-based dashboards for candidates and recruiters

A sample `.env.example` file is included in `backend/` for local configuration.
