@echo off
echo Generating sitemap...
powershell -ExecutionPolicy Bypass -File generate_sitemap.ps1
echo.
echo Generating search index...
powershell -ExecutionPolicy Bypass -File generate_search_index.ps1
echo.
echo Done.
pause
