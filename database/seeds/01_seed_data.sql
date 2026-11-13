-- ==============================================================================
-- SmartHire AI - Demo Seed Data
-- ==============================================================================

-- 1. Insert Recruiter and Candidate Users
-- Passwords hashed for 'password123' using bcrypt
INSERT INTO users (id, email, hashed_password, full_name, role) VALUES
('a0000000-0000-0000-0000-000000000001', 'recruiter@smarthire.ai', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Sarah Connor', 'recruiter'),
('b0000000-0000-0000-0000-000000000002', 'candidate@smarthire.ai', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Alex Mercer', 'candidate'),
('c0000000-0000-0000-0000-000000000003', 'prasad@smarthire.ai', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Prasad Turala', 'candidate')
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Sample Jobs
INSERT INTO jobs (id, recruiter_id, title, department, location, job_type, description, requirements, skills_required, salary_min, salary_max, status) VALUES
('j0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 
 'Senior AI / Full-Stack Engineer', 'Engineering', 'Remote / Hybrid', 'Full-time',
 'We are looking for a high-impact AI/Full-Stack Engineer to architect, build, and deploy generative AI applications.',
 '3+ years experience with Python, FastAPI, React/Next.js, LangChain, and Vector DBs. Strong grasp of LLM evaluation and prompt engineering.',
 '["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "LangChain", "Gemini API"]'::jsonb,
 120000, 160000, 'active'),

('j0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001',
 'Frontend Engineer (React / Next.js)', 'Product Design', 'Remote', 'Full-time',
 'Design and develop responsive, highly accessible candidate and recruiter portals.',
 '2+ years with modern JavaScript/TypeScript, React 18, Tailwind CSS, REST APIs.',
 '["React", "TypeScript", "Tailwind CSS", "Next.js", "Jest", "REST APIs"]'::jsonb,
 90000, 130000, 'active')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Sample Resumes
INSERT INTO resumes (id, candidate_id, file_name, file_path, raw_text, parsed_data) VALUES
('r0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002',
 'Alex_Mercer_Resume.pdf', '/uploads/resumes/alex_mercer.pdf',
 'Alex Mercer. Full-Stack Developer with expertise in React, TypeScript, FastAPI, PostgreSQL, and Docker. Experience building LLM-powered search tools.',
 '{
   "name": "Alex Mercer",
   "email": "candidate@smarthire.ai",
   "skills": ["React", "TypeScript", "Python", "FastAPI", "Docker", "PostgreSQL"],
   "experience_years": 4,
   "education": "B.S. in Computer Science"
 }'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Sample Application
INSERT INTO applications (id, job_id, candidate_id, resume_id, status, match_score, ai_feedback) VALUES
('a1000000-0000-0000-0000-000000000001', 
 'j0000000-0000-0000-0000-000000000001', 
 'b0000000-0000-0000-0000-000000000002', 
 'r0000000-0000-0000-0000-000000000001', 
 'shortlisted', 
 92.5, 
 '{
   "summary": "Strong candidate match. Demonstrates proven hands-on experience with FastAPI, React, and PostgreSQL.",
   "matched_skills": ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
   "missing_skills": ["Gemini API", "LangChain"],
   "recommendation": "Proceed to Technical Interview"
 }'::jsonb)
ON CONFLICT (id) DO NOTHING;
