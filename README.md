# 🛡️ CyberRazor - VS Code Extension

**Real-time vulnerability detection and security advisor powered by Snyk**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=nisa-iqbal.cyberrazor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-blue.svg)](https://code.visualstudio.com/)

## 🚀 Features

### 🔍 **Automatic Security Scanning**
- **Real-time scanning** on every file save (Ctrl+S)
- **Multi-language support** for JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, and more
- **Intelligent file detection** - only scans supported file types

### 🚨 **Vulnerability Detection**
- **Severity classification**: Critical, High, Medium, Low
- **Line-by-line highlighting** using VS Code Diagnostics API
- **Hover tooltips** with vulnerability details and remediation advice
- **Package vulnerability tracking** with version information

### 📊 **Comprehensive Reporting**
- **Structured reports** in Markdown or HTML format
- **Vulnerability summaries** with severity breakdowns
- **Affected files and line numbers** for easy navigation
- **Remediation recommendations** and upgrade paths
- **Official resource links** to Snyk documentation

### 🎯 **Command Palette Integration**
- **Scan Current File**: Analyze active editor for vulnerabilities
- **Scan Workspace**: Comprehensive project-wide security audit
- **View Last Report**: Quick access to latest scan results
- **Configure Snyk Token**: Easy API token management

### ⚙️ **Smart Configuration**
- **Auto-scan on save** (configurable)
- **Severity thresholds** to filter noise
- **Report format selection** (Markdown/HTML)
- **Snyk CLI integration** with installation prompts

## 📦 Installation

### Prerequisites
1. **Visual Studio Code** 1.74.0 or higher
2. **Snyk CLI** (will prompt for installation if missing)

### Extension Installation
1. Open VS Code
2. Press `Ctrl+Shift+X` to open Extensions
3. Search for "CyberRazor"
4. Click Install

### Snyk CLI Setup
```bash
# Install Snyk CLI globally
npm install -g snyk

# Authenticate with your Snyk account
snyk auth
```

## 🚀 Quick Start

### 1. **First Scan**
- Open any supported file (`.js`, `.ts`, `.py`, `.java`, etc.)
- Press `Ctrl+S` to save - automatic scan begins
- View results in Problems panel and hover tooltips

### 2. **Manual Scanning**
- **Current File**: `Ctrl+Shift+P` → "CyberRazor: Scan Current File"
- **Workspace**: `Ctrl+Shift+P` → "CyberRazor: Scan Workspace"

### 3. **View Reports**
- `Ctrl+Shift+P` → "CyberRazor: View Last Report"
- Reports are saved in `/cyberrazor-reports` folder
- Opens in VS Code preview with syntax highlighting

## ⚙️ Configuration

### Extension Settings
Open VS Code Settings (`Ctrl+,`) and search for "CyberRazor":

```json
{
  "cyberrazor.snykToken": "your-snyk-api-token",
  "cyberrazor.autoScanOnSave": true,
  "cyberrazor.reportFormat": "markdown",
  "cyberrazor.severityThreshold": "low"
}
```

### Snyk Token Configuration
1. Get your Snyk API token from [Snyk Dashboard](https://app.snyk.io/account)
2. `Ctrl+Shift+P` → "CyberRazor: Configure Snyk Token"
3. Enter your token when prompted

## 🔧 Supported Languages

| Language | Extensions | Package Managers |
|----------|------------|------------------|
| **JavaScript/Node.js** | `.js`, `.jsx`, `.ts`, `.tsx` | `npm`, `yarn`, `pnpm` |
| **Python** | `.py` | `pip`, `poetry`, `pipenv` |
| **Java** | `.java` | `maven`, `gradle` |
| **Go** | `.go` | `go mod` |
| **Ruby** | `.rb` | `bundler` |
| **PHP** | `.php` | `composer` |
| **C#** | `.cs` | `nuget` |
| **Rust** | `.rs` | `cargo` |

## 📊 Understanding Reports

### Vulnerability Severity Levels
- 🔴 **Critical**: Immediate action required, potential for severe damage
- 🟠 **High**: High priority, should be addressed quickly
- 🟡 **Medium**: Moderate risk, plan for next development cycle
- 🔵 **Low**: Low risk, monitor and address when convenient

### Report Contents
- **Executive Summary**: Vulnerability counts by severity
- **Detailed Findings**: Each vulnerability with full context
- **Affected Dependencies**: Package names and versions
- **Remediation Steps**: Upgrade paths and fix recommendations
- **Resource Links**: Official documentation and references

## 🛠️ Troubleshooting

### Common Issues

#### "Snyk CLI not found"
```bash
# Install Snyk CLI globally
npm install -g snyk

# Verify installation
snyk --version
```

#### "Authentication failed"
1. Check your Snyk API token: `snyk config get api-token`
2. Re-authenticate: `snyk auth`
3. Update token in VS Code settings

#### "No vulnerabilities found"
- Ensure you're scanning a project with dependencies
- Check if `package.json`, `requirements.txt`, etc. exist
- Verify Snyk has access to your project

#### "Scan taking too long"
- Large projects may take several minutes
- Check Snyk rate limits and API status
- Consider scanning individual files instead of workspace

### Debug Mode
Enable detailed logging in VS Code Developer Console:
1. `Ctrl+Shift+P` → "Developer: Toggle Developer Tools"
2. Check Console tab for detailed scan information

## 🔗 Integration

### CI/CD Pipeline
```yaml
# GitHub Actions example
- name: Security Scan
  run: |
    npm install -g snyk
    snyk test --severity-threshold=high
```

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "snyk test --severity-threshold=medium"
    }
  }
}
```

## 📈 Performance Tips

- **File-level scanning** is faster than workspace scanning
- **Configure severity thresholds** to reduce noise
- **Use Snyk CI/CD integration** for automated scanning
- **Regular dependency updates** reduce vulnerability surface

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/nisa-iqbal/cyberrazor-vscode.git
cd cyberrazor-vscode
npm install
npm run compile
npm run watch
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Snyk** for providing the vulnerability database and CLI
- **VS Code Team** for the excellent extension API
- **Open Source Community** for security research and tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/nisa-iqbal/cyberrazor-vscode/issues)
- **Documentation**: [Snyk Documentation](https://docs.snyk.io/)
- **Security**: [Snyk Security](https://security.snyk.io/)

---

**Built with ❤️ by NISA IQBAL**

*Empowering developers with real-time security intelligence*
