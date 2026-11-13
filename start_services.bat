@echo off
title SmartHire AI Launcher
echo ==========================================================
echo               SmartHire AI - Service Launcher
echo ==========================================================
echo.

:: 1. Launch AI Service (Python)
echo [1/3] Starting Python FastAPI AI Microservice on port 8000...
start "SmartHire AI Service (Port 8000)" cmd /k "cd /d %~dp0ai-service && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

:: Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [2/3] Starting Node.js Backend API on port 5000...
    start "SmartHire Backend API (Port 5000)" cmd /k "cd /d %~dp0backend && npm install && npm run dev"

    echo [3/3] Starting React Frontend Client on port 5173...
    start "SmartHire Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"
    
    timeout /t 3 >nul
    start http://localhost:5173
) else (
    echo.
    echo [NOTICE] Node.js is not installed or not in PATH.
    echo To run the Node backend and React frontend:
    echo 1. Download and install Node.js LTS from: https://nodejs.org/
    echo 2. Re-run this launcher.
    echo.
    echo In the meantime, the Python AI Service is running at:
    echo http://localhost:8000/docs
    timeout /t 3 >nul
    start http://localhost:8000/docs
)

echo.
echo ==========================================================
echo Launcher finished. Check the opened terminal windows.
echo ==========================================================
pause
