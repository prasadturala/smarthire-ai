# SmartHire AI frontend

React + Vite client for candidate and recruiter workflows.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

By default, API requests target `http://localhost:5000/api`. Set `VITE_API_URL` in `.env` to override this.

## API contract

Authenticated requests include `Authorization: Bearer <token>`.

| Method | Path | Expected request / response |
| --- | --- | --- |
| `POST` | `/auth/register` | `{ name, email, password, role }`; response may contain `{ token, user }` |
| `POST` | `/auth/login` | `{ email, password }`; response contains `{ token, user }` |
| `GET` | `/jobs` | Array of jobs or `{ jobs: [...] }` |
| `POST` | `/jobs` | `{ title, department, location, description, requirements, skills_required: string[] }` |
| `GET` | `/applications` | Array of applications or `{ applications: [...] }` |
| `POST` | `/applications` | Multipart fields `jobId` and `resume` (PDF); response includes `analysis` or the analysis object |
| `PATCH` | `/applications/:id/status` | `{ status }` |

Analysis fields are `match_score`, `matched_skills`, and `missing_skills` (camelCase variants are accepted). Scores and skill comparisons are supporting information only; they do not decide hiring outcomes.
