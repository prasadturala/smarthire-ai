# ==============================================================================
# SmartHire AI - Universal Project Runner
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "             SmartHire AI - Project Launcher              " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $CurrentDir

# 1. Verify Python & Start AI Service
Write-Host "`n[1/3] Checking Python & AI Service..." -ForegroundColor Yellow
$PythonCheck = Get-Command python -ErrorAction SilentlyContinue
if ($PythonCheck) {
    Write-Host "  -> Python is available: $(python --version)" -ForegroundColor Green
    Write-Host "  -> Launching Python AI Service on http://localhost:8000..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\ai-service'; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
    Write-Host "  -> AI Service documentation: http://localhost:8000/docs" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Python is not found on PATH. Please install Python 3.10+." -ForegroundColor Red
}

# 2. Verify Node.js & Start Backend API
Write-Host "`n[2/3] Checking Node.js Backend..." -ForegroundColor Yellow
$NodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($NodeCheck) {
    Write-Host "  -> Node.js is available: $(node -v)" -ForegroundColor Green
    Write-Host "  -> Installing backend dependencies & launching API on port 5000..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\backend'; npm install; npm run dev"
} else {
    Write-Host "  [NOTICE] Node.js is not yet detected on PATH." -ForegroundColor DarkYellow
    Write-Host "  -> To run the Express backend and React UI, install Node.js LTS from:" -ForegroundColor DarkYellow
    Write-Host "     https://nodejs.org/ (or run: winget install OpenJS.NodeJS.LTS)" -ForegroundColor DarkCyan
}

# 3. Verify Node.js & Start Frontend Client
Write-Host "`n[3/3] Checking React Frontend Client..." -ForegroundColor Yellow
if ($NodeCheck) {
    Write-Host "  -> Installing frontend dependencies & launching Vite on port 5173..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\frontend'; npm install; npm run dev"
    Start-Process "http://localhost:5173"
} else {
    Write-Host "  -> Frontend requires Node.js to execute 'npm run dev'." -ForegroundColor DarkYellow
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host " Launcher Complete. Python AI Service is active!         " -ForegroundColor Green
Write-Host " Documentation: http://localhost:8000/docs               " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
