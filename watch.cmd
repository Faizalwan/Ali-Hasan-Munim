@echo off
rem Build ulang CSS otomatis setiap ada perubahan file selama pengembangan
cd /d "%~dp0"
"tools\tailwindcss.exe" -c tailwind.config.js -i src\input.css -o dist\styles.css --watch
