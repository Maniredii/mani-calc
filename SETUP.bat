@echo off
title Mani-Calc Setup
color 0B
echo.
echo  ╔═══════════════════════════════════════════════════════════╗
echo  ║                                                           ║
echo  ║          🧮  MANI-CALC SETUP WIZARD  🧮                   ║
echo  ║                                                           ║
echo  ║   Spotlight-style Calculator for Windows                  ║
echo  ║                                                           ║
echo  ╚═══════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  ❌ ERROR: Node.js is not installed!
    echo.
    echo  Please install Node.js from: https://nodejs.org/
    echo  Then run this setup again.
    echo.
    pause
    exit /b 1
)

echo  ✓ Node.js detected
echo.

:: Get the directory where this batch file is located
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo  📦 Installing dependencies...
    echo     This may take a minute...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo  ❌ ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
    echo  ✓ Dependencies installed
    echo.
)

echo.
echo  ═══════════════════════════════════════════════════════════
echo.
echo   What would you like to do?
echo.
echo   [1] Install Auto-Start (run automatically when Windows boots)
echo   [2] Start Mani-Calc now
echo   [3] Both (Install Auto-Start AND Start now)
echo   [4] Exit
echo.
echo  ═══════════════════════════════════════════════════════════
echo.

set /p choice=  Enter your choice (1-4): 

if "%choice%"=="1" goto install_autostart
if "%choice%"=="2" goto start_now
if "%choice%"=="3" goto both
if "%choice%"=="4" goto end

echo.
echo  Invalid choice. Please try again.
pause
goto end

:install_autostart
echo.
echo  📝 Installing Auto-Start...
echo.
call npm run install-autostart
echo.
echo  ═══════════════════════════════════════════════════════════
echo.
echo  ✅ Setup complete!
echo.
echo  Mani-Calc will now start automatically when Windows boots.
echo  Press Alt+Space anytime to open the calculator!
echo.
pause
goto end

:start_now
echo.
echo  🚀 Starting Mani-Calc...
echo.
echo  Press Alt+Space to open the calculator!
echo  Press Ctrl+C in this window to stop.
echo.
call npm run overlay
goto end

:both
echo.
echo  📝 Installing Auto-Start...
echo.
call npm run install-autostart
echo.
echo  🚀 Starting Mani-Calc...
echo.
echo  Press Alt+Space to open the calculator!
echo  You can close this window - Mani-Calc runs in the background!
echo.
start "" npm run overlay
echo.
echo  ═══════════════════════════════════════════════════════════
echo.
echo  ✅ Setup complete!
echo.
echo  • Mani-Calc is now running!
echo  • It will start automatically when Windows boots.
echo  • Press Alt+Space anytime to open the calculator!
echo.
pause
goto end

:end
