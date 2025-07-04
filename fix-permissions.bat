@echo off
echo Fixing Next.js permissions issue...
cd /d "e:\Software Dev\Crystalize\Norko\norko-crystalize-frontend"

echo Cleaning up .next directory...
if exist .next (
    rmdir /s /q .next
    echo .next directory removed
)

echo Clearing npm cache...
npm cache clean --force

echo Recreating .next directory with proper permissions...
mkdir .next
icacls .next /grant Everyone:(F) /T

echo Starting development server...
npm run dev

pause
