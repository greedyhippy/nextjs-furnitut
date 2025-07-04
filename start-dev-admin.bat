@echo off
echo Starting Next.js development server...
cd /d "e:\Software Dev\Crystalize\Norko\norko-crystalize-frontend"

echo Checking if .next directory exists...
if not exist .next (
    echo Creating .next directory...
    mkdir .next
)

echo Setting directory permissions...
icacls .next /grant %USERNAME%:(F) /T >nul 2>&1

echo Starting server on port 3000...
npm run dev

echo.
echo If you see permission errors, try:
echo 1. Running this batch file as Administrator
echo 2. Using fix-permissions.bat
echo 3. Temporarily disabling antivirus software
pause
