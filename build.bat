@echo off
echo Building the documentation site...
mkdocs build
if %ERRORLEVEL% NEQ 0 (
    echo ==========================================
    echo BUILD FAILED
    echo ==========================================
    pause
    exit /b %ERRORLEVEL%
)
echo ==========================================
echo Build successful! Site generated in /site
echo ==========================================
pause
