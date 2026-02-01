@echo off
echo Stopping any running node processes (optional)...
taskkill /im node.exe /f 2>nul

echo Running fix script...
powershell -ExecutionPolicy Bypass -File scripts/fix.ps1

echo Done!
pause
