@echo off
echo 🚀 CyberRazor VS Code Extension Deployment
echo =========================================

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the extension directory.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo 🔨 Compiling TypeScript...
call npm run compile
if errorlevel 1 (
    echo ❌ Compilation failed
    pause
    exit /b 1
)

echo 📦 Packaging extension...
call npx vsce package
if errorlevel 1 (
    echo ❌ Packaging failed
    pause
    exit /b 1
)

echo ✅ Extension packaged successfully!
echo.
echo 💡 To install locally: code --install-extension cyberrazor-1.0.0.vsix
echo 💡 To publish: vsce publish
echo.
pause
