# 🚀 CyberRazor VS Code Extension - Installation Guide

This guide will walk you through installing and setting up the CyberRazor VS Code extension for real-time vulnerability detection.

## 📋 Prerequisites

Before installing CyberRazor, ensure you have:

- **Visual Studio Code** 1.74.0 or higher
- **Node.js** 16.x or higher (for Snyk CLI)
- **npm** or **yarn** package manager
- **Git** (for development installation)

## 🔧 Installation Methods

### Method 1: Install from VSIX Package (Recommended)

1. **Download the VSIX file** from the [releases page](https://github.com/nisa-iqbal/cyberrazor-vscode/releases)
2. **Open VS Code**
3. **Press `Ctrl+Shift+P`** (Windows/Linux) or `Cmd+Shift+P` (macOS)
4. **Type**: `Extensions: Install from VSIX...`
5. **Select the downloaded VSIX file**
6. **Restart VS Code** when prompted

### Method 2: Install from Source (Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nisa-iqbal/cyberrazor-vscode.git
   cd cyberrazor-vscode
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile the extension**:
   ```bash
   npm run compile
   ```

4. **Open in VS Code**:
   ```bash
   code .
   ```

5. **Press F5** to launch the extension in Extension Development Host

### Method 3: Install from Marketplace (Future)

Once published to the VS Code Marketplace:
1. **Open VS Code**
2. **Go to Extensions** (`Ctrl+Shift+X`)
3. **Search for "CyberRazor"**
4. **Click Install**

## 🐍 Snyk CLI Installation

CyberRazor requires the Snyk CLI for vulnerability scanning. The extension will prompt you to install it if missing.

### Automatic Installation (Recommended)
1. **Open VS Code Command Palette** (`Ctrl+Shift+P`)
2. **Run**: `CyberRazor: Configure Snyk Token`
3. **Follow the prompts** to install Snyk CLI

### Manual Installation

#### Windows
```powershell
# Using npm
npm install -g snyk

# Using Chocolatey
choco install snyk

# Using Scoop
scoop install snyk
```

#### macOS
```bash
# Using npm
npm install -g snyk

# Using Homebrew
brew install snyk
```

#### Linux
```bash
# Using npm
npm install -g snyk

# Using Snap
sudo snap install snyk

# Using package managers
# Ubuntu/Debian
curl -s https://static.snyk.io/cli/latest/install.sh | sh

# CentOS/RHEL
curl -s https://static.snyk.io/cli/latest/install.sh | sh
```

## 🔑 Snyk API Token Configuration

1. **Get your Snyk API token**:
   - Visit [Snyk Account Settings](https://app.snyk.io/account)
   - Go to **API tokens** section
   - Click **Create API token**
   - Copy the generated token

2. **Configure in CyberRazor**:
   - **Open Command Palette** (`Ctrl+Shift+P`)
   - **Run**: `CyberRazor: Configure Snyk Token`
   - **Paste your API token** when prompted

3. **Alternative configuration**:
   - **Open VS Code Settings** (`Ctrl+,`)
   - **Search for "cyberrazor"**
   - **Set** `cyberrazor.snykToken` to your token

## ⚙️ Configuration Options

### Extension Settings

Open VS Code Settings (`Ctrl+,`) and search for "cyberrazor":

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| `cyberrazor.snykToken` | Snyk API token for enhanced scanning | `""` | Your Snyk API token |
| `cyberrazor.autoScanOnSave` | Enable automatic scanning on file save | `true` | `true`/`false` |
| `cyberrazor.reportFormat` | Default report format | `"markdown"` | `"markdown"`/`"html"` |
| `cyberrazor.severityThreshold` | Minimum severity to report | `"low"` | `"critical"`/`"high"`/`"medium"`/`"low"` |
| `cyberrazor.reportsFolder` | Custom reports folder path | `"./cyberrazor-reports"` | Any valid path |
| `cyberrazor.maxScanDuration` | Maximum scan duration in seconds | `300` | 60-1800 |
| `cyberrazor.enableNotifications` | Show scan notifications | `true` | `true`/`false` |

### Workspace Settings

Create `.vscode/settings.json` in your workspace:

```json
{
  "cyberrazor.snykToken": "your-snyk-token-here",
  "cyberrazor.autoScanOnSave": true,
  "cyberrazor.reportFormat": "markdown",
  "cyberrazor.severityThreshold": "medium",
  "cyberrazor.reportsFolder": "./security-reports",
  "cyberrazor.maxScanDuration": 600,
  "cyberrazor.enableNotifications": true
}
```

## 🚀 First-Time Setup

### 1. Verify Installation
1. **Open VS Code**
2. **Check Extensions** (`Ctrl+Shift+X`)
3. **Verify CyberRazor is installed and enabled**

### 2. Configure Snyk
1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Run**: `CyberRazor: Configure Snyk Token`
3. **Enter your Snyk API token**

### 3. Test the Extension
1. **Open a project** with package dependencies
2. **Save a file** (`Ctrl+S`) to trigger auto-scan
3. **Check the status bar** for scan progress
4. **View results** in the Problems panel

## 📁 Supported File Types

CyberRazor automatically detects and scans these file types:

### Package Managers
- **npm**: `package.json`, `package-lock.json`
- **yarn**: `yarn.lock`
- **pnpm**: `pnpm-lock.yaml`

### Programming Languages
- **JavaScript**: `.js`, `.jsx`
- **TypeScript**: `.ts`, `.tsx`
- **Python**: `requirements.txt`, `Pipfile`, `poetry.lock`
- **Java**: `pom.xml`, `build.gradle`
- **Go**: `go.mod`, `go.sum`
- **Ruby**: `Gemfile`, `Gemfile.lock`
- **PHP**: `composer.json`, `composer.lock`
- **C#**: `.csproj`, `.sln`
- **Rust**: `Cargo.toml`, `Cargo.lock`

## 🎯 Available Commands

### Command Palette Commands
- **`CyberRazor: Scan Current File`** - Scan the active editor file
- **`CyberRazor: Scan Workspace`** - Scan entire workspace
- **`CyberRazor: View Last Report`** - Open the most recent scan report
- **`CyberRazor: Configure Snyk Token`** - Set up Snyk API token

### Keyboard Shortcuts
- **`Ctrl+S`** - Save file and trigger auto-scan (if enabled)
- **`Ctrl+Shift+P`** - Open Command Palette for manual commands

## 🔍 Understanding Scan Results

### Status Bar Indicators
- **🟢 Ready** - Extension ready for scanning
- **🟡 Scanning** - Scan in progress
- **🔴 Vulnerabilities Found** - Issues detected
- **⚪ No Issues** - Scan completed, no vulnerabilities

### Problems Panel
- **Vulnerabilities** appear as problems with severity indicators
- **Hover over lines** to see vulnerability details
- **Click on problems** to navigate to affected code

### Reports
- **Location**: `./cyberrazor-reports/` folder
- **Format**: Markdown or HTML (configurable)
- **Content**: Detailed vulnerability information and remediation steps

## 🛠️ Troubleshooting

### Common Issues

#### Snyk CLI Not Found
```
Error: Snyk CLI not found. Please install it first.
```
**Solution**: Run `CyberRazor: Configure Snyk Token` and follow the installation prompts

#### Invalid API Token
```
Error: Invalid Snyk API token. Please check your configuration.
```
**Solution**: Verify your token at [Snyk Account Settings](https://app.snyk.io/account) and reconfigure

#### Scan Timeout
```
Error: Scan timed out after 300 seconds.
```
**Solution**: Increase `cyberrazor.maxScanDuration` in settings or reduce project size

#### No Vulnerabilities Found
```
No vulnerabilities found in this project.
```
**Solution**: This is normal for secure projects. Check that you have dependencies and the scan completed successfully

### Debug Mode

Enable debug logging:
1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Run**: `Developer: Toggle Developer Tools`
3. **Check Console** for detailed logs

### Reset Configuration

Reset all CyberRazor settings:
1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Run**: `Preferences: Open Settings (JSON)`
3. **Remove all** `cyberrazor.*` settings
4. **Restart VS Code**

## 🔒 Security Considerations

### API Token Security
- **Never commit** your Snyk API token to version control
- **Use environment variables** in production
- **Rotate tokens** regularly
- **Limit token permissions** to minimum required

### Scan Results
- **Review reports** before sharing
- **Sanitize sensitive information** in reports
- **Use secure channels** for sharing security findings

### Network Access
- **Snyk CLI** requires internet access for vulnerability database
- **Firewall rules** may need to allow Snyk API access
- **Proxy settings** may be required in corporate environments

## 📚 Additional Resources

### Documentation
- [CyberRazor README](README.md)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Snyk CLI Documentation](https://docs.snyk.io/snyk-cli)

### Support
- [GitHub Issues](https://github.com/nisa-iqbal/cyberrazor-vscode/issues)
- [GitHub Discussions](https://github.com/nisa-iqbal/cyberrazor-vscode/discussions)
- [Snyk Support](https://support.snyk.io/)

### Community
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/)
- [Snyk Community](https://community.snyk.io/)
- [Security Best Practices](https://owasp.org/)

## 🎉 Getting Started

1. **Install the extension** using one of the methods above
2. **Configure your Snyk API token**
3. **Open a project** with dependencies
4. **Save a file** to trigger your first scan
5. **Review the results** in the Problems panel
6. **Generate reports** using the Command Palette
7. **Integrate into your workflow** for continuous security

---

**Happy coding securely! 🛡️**

*CyberRazor - Your real-time security advisor in VS Code*

