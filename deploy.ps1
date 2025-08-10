# CyberRazor VS Code Extension Deployment Script
# This script automates the packaging and publishing process

param(
    [Parameter(Mandatory=$false)]
    [string]$PublisherId = "nisa-iqbal",
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("patch", "minor", "major", "none")]
    [string]$VersionBump = "none",
    
    [Parameter(Mandatory=$false)]
    [switch]$PackageOnly,
    
    [Parameter(Mandatory=$false)]
    [switch]$Publish
)

Write-Host "🚀 CyberRazor VS Code Extension Deployment Script" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the extension directory." -ForegroundColor Red
    exit 1
}

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 2: Compile TypeScript
Write-Host "🔨 Compiling TypeScript..." -ForegroundColor Yellow
npm run compile
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Compilation failed" -ForegroundColor Red
    exit 1
}

# Step 3: Run tests (if available)
if (Test-Path "out/test") {
    Write-Host "🧪 Running tests..." -ForegroundColor Yellow
    npm test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Tests failed, but continuing..." -ForegroundColor Yellow
    }
}

# Step 4: Package extension
Write-Host "📦 Packaging extension..." -ForegroundColor Yellow
npx vsce package
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Packaging failed" -ForegroundColor Red
    exit 1
}

# Get the generated VSIX file
$vsixFile = Get-ChildItem "*.vsix" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($vsixFile) {
    Write-Host "✅ Extension packaged successfully: $($vsixFile.Name)" -ForegroundColor Green
    Write-Host "📁 File size: $([math]::Round($vsixFile.Length / 1KB, 2)) KB" -ForegroundColor Cyan
} else {
    Write-Host "❌ No VSIX file found" -ForegroundColor Red
    exit 1
}

if ($PackageOnly) {
    Write-Host "📦 Package-only mode. VSIX file created successfully." -ForegroundColor Green
    Write-Host "💡 To install locally: code --install-extension $($vsixFile.Name)" -ForegroundColor Cyan
    exit 0
}

# Step 5: Publish (if requested)
if ($Publish) {
    Write-Host "🚀 Publishing extension..." -ForegroundColor Yellow
    
    # Check if vsce is installed globally
    try {
        $null = Get-Command vsce -ErrorAction Stop
    } catch {
        Write-Host "📦 Installing vsce globally..." -ForegroundColor Yellow
        npm install -g @vscode/vsce
    }
    
    # Publish with version bump if specified
    if ($VersionBump -ne "none") {
        Write-Host "📈 Publishing with $VersionBump version bump..." -ForegroundColor Yellow
        vsce publish $VersionBump
    } else {
        Write-Host "📤 Publishing current version..." -ForegroundColor Yellow
        vsce publish
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Extension published successfully!" -ForegroundColor Green
        Write-Host "🌐 Check it out at: https://marketplace.visualstudio.com/search?term=$PublisherId" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Publishing failed" -ForegroundColor Red
        Write-Host "💡 Make sure you're logged in with: vsce login $PublisherId" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "📦 Extension packaged successfully!" -ForegroundColor Green
    Write-Host "💡 To publish, run: .\deploy.ps1 -Publish" -ForegroundColor Cyan
    Write-Host "💡 To install locally: code --install-extension $($vsixFile.Name)" -ForegroundColor Cyan
}

Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
