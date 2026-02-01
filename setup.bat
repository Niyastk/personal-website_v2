@echo off
echo ==========================================
echo Scrollytelling Portfolio Setup
echo ==========================================

echo [1/3] Installing Dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies. Please ensure Node.js is installed.
    pause
    exit /b
)

echo [2/3] Moving Assets...
if not exist "public\sequence" mkdir "public\sequence"
move "..\frame_*.png" "public\sequence\"
if %ERRORLEVEL% NEQ 0 (
    echo Warning: No frame files found in parent directory or move failed.
    echo Assuming assets are already in place or need manual moving.
)

echo [3/3] Normalizing Assets...
node scripts/setup-assets.js

echo ==========================================
echo Setup Complete!
echo Run 'npm run dev' to start the server.
echo ==========================================
pause
