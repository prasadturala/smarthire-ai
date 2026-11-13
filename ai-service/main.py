from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from resume_parser import extract_text_from_pdf
from skill_extractor import extract_skills
from matcher import match_skills

app = FastAPI(
    title="SmartHire AI - Resume Analysis Service",
    description="Microservice providing PDF resume parsing, skill extraction, and candidate matching.",
    version="1.0.0"
)

# CORS Middleware for integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    candidate_name: Optional[str] = "Applicant"
    resume_skills: Optional[List[str]] = []
    required_skills: List[str]
    raw_text: Optional[str] = ""

class MatchResult(BaseModel):
    candidateName: str
    match_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    extractedSkills: List[str]
    summary: str
    recommendation: str

@app.get("/")
def read_root():
    return {
        "service": "SmartHire AI Python Service",
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ai-service"}

@app.post("/analyze", response_model=MatchResult)
async def analyze_resume(payload: AnalyzeRequest):
    """
    Core endpoint called by Node.js backend to compare candidate skills with job requirements.
    """
    candidate_skills = list(payload.resume_skills or [])
    
    # If raw resume text was provided, extract skills from text
    if payload.raw_text:
        extracted = extract_skills(payload.raw_text)
        candidate_skills = list(set(candidate_skills + extracted))

    # Match skills against job requirements
    result = match_skills(candidate_skills, payload.required_skills)
    score = result["match_score"]

    recommendation = (
        "Strong Match - Recommended for Interview" if score >= 80
        else "Moderate Match - Review Portfolio" if score >= 60
        else "Low Match - Significant Skill Gaps"
    )

    summary = (
        f"Candidate matched {len(result['matched_skills'])} of {len(payload.required_skills)} required skills. "
        f"Missing competencies: {', '.join(result['missing_skills']) if result['missing_skills'] else 'None'}."
    )

    return MatchResult(
        candidateName=payload.candidate_name or "Applicant",
        match_score=score,
        matched_skills=result["matched_skills"],
        missing_skills=result["missing_skills"],
        extractedSkills=candidate_skills,
        summary=summary,
        recommendation=recommendation
    )

@app.post("/upload-pdf")
async def upload_pdf_resume(
    file: UploadFile = File(...),
    required_skills: str = Form("Python,FastAPI,React,Docker")
):
    """
    Direct endpoint for uploading a PDF resume and running analysis.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    content = await file.read()
    raw_text = extract_text_from_pdf(content)
    extracted = extract_skills(raw_text)

    req_list = [s.strip() for s in required_skills.split(",") if s.strip()]
    result = match_skills(extracted, req_list)

    return {
        "filename": file.filename,
        "raw_text_length": len(raw_text),
        "extracted_skills": extracted,
        "match_score": result["match_score"],
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
