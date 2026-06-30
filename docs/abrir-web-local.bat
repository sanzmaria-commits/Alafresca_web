@echo off
chcp 65001 >nul
set "NODE=C:\Users\sanzm.MARIASANZ\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
cd /d "%~dp0"

if not exist "%NODE%" (
  echo No se ha encontrado el programa necesario para abrir la web.
  echo Ruta buscada: %NODE%
  pause
  exit /b 1
)

start "A la fresca - servidor local" cmd /k ""%NODE%" "%~dp0server.js""
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:4173/"
