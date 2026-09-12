@echo off
echo Initializing Git repository for Solar Sensei...
echo.

cd /d "%~dp0"

git init
git add .
git commit -m "Initial commit: Solar Sensei home preview"

echo.
echo Repository initialized!
echo.
echo Next steps:
echo 1. Create a repo at github.com/new (name: solar-sensei, Public)
echo 2. Run these commands:
echo    git remote add origin https://github.com/YOURUSERNAME/solar-sensei.git
echo    git branch -M main
echo    git push -u origin main
echo 3. Enable GitHub Pages: Settings > Pages > Source: main branch
echo.
echo Your site will be live at: https://YOURUSERNAME.github.io/solar-sensei/
echo.
pause