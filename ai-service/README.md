# AI Service

This folder contains the Python FastAPI service used to score candidate resumes and decide fit against hiring requirements.

## Local setup

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health` — service health check
- `POST /analyze` — analyze an uploaded resume text blob
- `POST /upload` — upload a resume file and analyze it
