@echo off
cd /d "%~dp0"
echo.
echo ChordBook Lite - gerando APK de venda...
echo Nao feche esta janela.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Gerar-APK-Release.ps1"
if errorlevel 1 (
  echo.
  echo Falhou. Leia a mensagem acima.
  pause
)
