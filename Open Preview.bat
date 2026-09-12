@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "preview.ps1"