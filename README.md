# 🛡️ CyberRazor - VS Code Security Extension

**Real-time vulnerability detection and security advisor for your code**

CyberRazor is a powerful VS Code extension that provides comprehensive security scanning capabilities for your codebase. Get instant feedback on security vulnerabilities as you code, powered by both Snyk integration and built-in security patterns.

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Minhal128.cyberrazor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-blue.svg)](https://code.visualstudio.com/)

## ✨ Key Features

- **🔍 Real-time vulnerability detection** - Scan your code as you type
- **🌐 Multi-language support** - JavaScript, TypeScript, Python, Java, PHP, and more
- **📊 Detailed vulnerability reports** - Get comprehensive security insights in JSON and HTML formats
- **🔧 Dual scanning modes** - Snyk integration + built-in fallback scanner
- **⚙️ Customizable scanning** - Configure scan behavior to match your workflow
- **📱 Interactive reports** - Browse vulnerabilities with detailed explanations and remediation advice
- **🚨 Multiple severity levels** - Critical, High, Medium, and Low vulnerability classification

## 🚀 Quick Start

### Installation Options

#### Option 1: Install from VSIX (Recommended)
```bash
code --install-extension cyberrazor-4.0.0.vsix
```

#### Option 2: VS Code Marketplace
1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search for "CyberRazor"
3. Click Install

### First Use

1. **Configure Snyk Token** (Optional but recommended)
   - Command Palette (Ctrl+Shift+P) → "CyberRazor: Configure Snyk Token"
   - Get your free token from [snyk.io](https://snyk.io)

2. **Start Scanning**
   - Right-click any file → "CyberRazor: Scan Current File"
   - Or use Command Palette → "CyberRazor: Scan Workspace"

3. **View Results**
   - Check the output panel for JSON results
   - HTML reports open automatically
   - Command Palette → "CyberRazor: View Last Report"

## 🔧 Configuration Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `cyberrazor.snykToken` | `""` | Your Snyk API token for enhanced scanning |
| `cyberrazor.autoScanOnSave` | `true` | Automatically scan files when saved |
| `cyberrazor.reportFormat` | `"markdown"` | Report format: "markdown" or "html" |
| `cyberrazor.severityThreshold` | `"low"` | Minimum severity: "low", "medium", "high", "critical" |

## 📋 Available Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `CyberRazor: Scan Current File` | Scan the currently active file | Right-click menu |
| `CyberRazor: Scan Workspace` | Scan all files in workspace | Command Palette |
| `CyberRazor: View Last Report` | Open most recent scan report | Command Palette |
| `CyberRazor: Configure Snyk Token` | Set up Snyk API token | Command Palette |
| `CyberRazor: Show Output Log` | View detailed scan logs | Command Palette |
| `CyberRazor: Force Show Output Panel` | Force display output panel | Command Palette |

## 🎯 Vulnerability Detection

CyberRazor detects these common security issues:

### High Severity
- **Hardcoded passwords** - Plain text credentials in code
- **Hardcoded API keys** - Exposed API tokens and keys
- **SQL injection patterns** - Unsafe database queries
- **Code injection (eval)** - Dynamic code execution vulnerabilities
- **Command injection** - OS command execution risks

### Medium Severity
- **XSS vulnerabilities** - Cross-site scripting patterns
- **Insecure HTTP usage** - Unencrypted HTTP connections
- **Weak random generation** - Predictable random number usage

### Low Severity
- **Console logging sensitive data** - Exposed sensitive information in logs
- **Insecure JSON parsing** - Unsafe JSON handling

## 🏗️ Development & Contributing

### Building from Source

```bash
git clone https://github.com/Minhal128/CyberRazor-Extension.git
cd CyberRazor-Extension
npm install
npm run compile
```

### Available Scripts

```bash
npm run compile      # Compile TypeScript
npm run watch        # Watch for changes
npm run test         # Run tests
npm run lint         # Lint code
```

### Packaging the Extension

```bash
npx vsce package --allow-package-all-secrets
```

## 📁 Project Structure

```
cyberrazor-vscode/
├── src/
│   ├── extension.ts     # Main extension logic
│   ├── css/            # Styling for reports
│   └── test/           # Test suites
├── images/             # Extension assets
├── out/               # Compiled JavaScript
├── package.json       # Extension manifest
└── README.md         # This file
```

## 🚨 Troubleshooting

### Common Issues

**"Snyk CLI not found" error:**
- The extension works without Snyk CLI using built-in patterns
- Install Snyk CLI globally: `npm install -g snyk`
- Or continue using the built-in fallback scanner

**No vulnerabilities detected:**
- Try the test file in `test-vulnerabilities.js`
- Check if file types are supported
- Adjust severity threshold in settings

**Output not showing:**
- Use "CyberRazor: Force Show Output Panel"
- Check VS Code's Output panel for "CyberRazor" channel

### Getting Help

1. Check the [Installation Guide](INSTALLATION_INSTRUCTIONS.md)
2. Review [Troubleshooting Documentation](FIX_VSCODE_EXTENSION.md)
3. [Create an issue](https://github.com/Minhal128/CyberRazor-Extension/issues) on GitHub

## 📚 Documentation

- [Installation Instructions](INSTALLATION_INSTRUCTIONS.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Change Log](CHANGELOG.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

Copyright (c) 2025 Minhal Rizvi

## 🙏 Acknowledgments

- Powered by [Snyk](https://snyk.io) for vulnerability data
- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- Thanks to all contributors and the open-source community

---

**🛡️ Stay secure, code confidently with CyberRazor!**

*Last updated: January 2025*
