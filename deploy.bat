@echo off
echo ========================================
echo   AXION AI - Deploy para Hostinger
echo ========================================
echo.

:: 1. Build do projeto
echo [1/3] Gerando build de producao...
call npx vite build
if %errorlevel% neq 0 (
    echo ERRO: Build falhou. Verifique os erros acima.
    pause
    exit /b 1
)
echo Build gerado com sucesso!
echo.

:: 2. Zipar a pasta dist
echo [2/3] Comprimindo pasta dist...
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'deploy_hostinger.zip' -Force"
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel criar o zip.
    pause
    exit /b 1
)
echo Arquivo deploy_hostinger.zip criado!
echo.

:: 3. Instrucoes
echo [3/3] Proximos passos para subir no Hostinger:
echo.
echo   1. Acesse hpanel.hostinger.com
echo   2. Va em "File Manager" no painel do seu dominio
echo   3. Abra a pasta "public_html"
echo   4. Clique em "Upload" e selecione: deploy_hostinger.zip
echo   5. Extraia o zip dentro de public_html
echo   6. Certifique-se que os arquivos estao diretamente em public_html/
echo      (nao dentro de uma subpasta)
echo.
echo ========================================
echo   Deploy pronto! Arquivo: deploy_hostinger.zip
echo ========================================
pause
