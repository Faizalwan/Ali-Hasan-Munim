@echo off
rem Build CSS produksi (minified) ke dist/styles.css
cd /d "%~dp0"
"tools\tailwindcss.exe" -c tailwind.config.js -i src\input.css -o dist\styles.css --minify
