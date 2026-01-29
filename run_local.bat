@echo off
echo Building the documentation site...
mkdocs build
if %ERRORLEVEL% NEQ 0 (
    echo ==========================================
    echo BUILD FAILED. Server will not start.
    echo ==========================================
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Starting local development server...
echo Press Ctrl+C to stop the server.
echo.
mkdocs serve
pause
