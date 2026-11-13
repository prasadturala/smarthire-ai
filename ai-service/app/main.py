from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title='SmartHire AI Service', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ResumeAnalysisRequest(BaseModel):
    file_name: str = 'resume.pdf'
    text: str = ''

SKILLS = [
    'javascript',
    'python',
    'react',
    'node',
    'sql',
    'postgresql',
    'communication',
    'leadership',
    'api',
    'teamwork',
]

@app.get('/')
def root():
    return {'name': 'SmartHire AI Service', 'status': 'running'}

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'ai-service'}

@app.post('/analyze')
def analyze_resume(payload: ResumeAnalysisRequest):
    normalized = (payload.text or '').lower()
    matched = [skill for skill in SKILLS if skill in normalized]
    missing = [skill for skill in SKILLS if skill not in normalized]
    score = min(100, max(55, round((len(matched) / len(SKILLS)) * 100)))

    return {
        'fileName': payload.file_name,
        'matchPercentage': score,
        'matchedSkills': matched,
        'missingSkills': missing[:5],
        'summary': f"Resume analysis for {payload.file_name} suggests {score}% alignment with the target job profile.",
        'strengths': matched or ['communication'],
        'recommendedNextStep': 'Proceed to interview stage.' if score >= 75 else 'Improve key skill gaps before follow-up.'
    }

@app.post('/upload')
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode('utf-8', errors='ignore')
    payload = ResumeAnalysisRequest(file_name=file.filename, text=text)
    return analyze_resume(payload)
