@echo off
title Ambiente de Desenvolvimento - React + NestJS - PPW2

:: Caminhos principais
set "BASE_DIR=%~dp0"
set "NODEJS_DIR=%BASE_DIR%..\..\nodejs"
set "REACT_DIR=%BASE_DIR%react_academico"
set "NEST_DIR=%BASE_DIR%nest_academico"

:: Adiciona Node portátil ao PATH
set "PATH=%NODEJS_DIR%;%PATH%"

:: Verifica se node está acessível
where node >nul 2>nul
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Verifique se a pasta nodejs contem node.exe e npm.cmd.
    pause
    exit /b
)

:: --- React ---
if exist "%REACT_DIR%\package.json" (
    echo Instalando dependencias do React...
    cd /d "%REACT_DIR%"
    call npm install
    start "React Vite" cmd /k "cd /d %REACT_DIR% && npm run dev"
) else (
    echo Projeto React nao encontrado em: %REACT_DIR%
)

:: --- NestJS ---
if exist "%NEST_DIR%\package.json" (
    echo Instalando dependencias do NestJS...
    cd /d "%NEST_DIR%"
    call npm install
    start "NestJS" cmd /k "cd /d %NEST_DIR% && npm run start:dev"
) else (
    echo Projeto NestJS nao encontrado em: %NEST_DIR%
)

echo Ambiente iniciado com sucesso!
pause
