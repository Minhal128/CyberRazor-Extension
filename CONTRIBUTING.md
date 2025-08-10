# Contributing to CyberRazor VS Code Extension

Thank you for your interest in contributing to CyberRazor! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **Visual Studio Code** 1.74.0 or higher
- **Git** for version control
- **npm** or **yarn** for package management

### Development Setup
1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cyberrazor-vscode.git
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

5. **Press F5** to launch the extension in a new Extension Development Host window

## 🛠️ Development Workflow

### Code Style
- **TypeScript**: Use strict mode and follow TypeScript best practices
- **Formatting**: Use Prettier for consistent code formatting
- **Linting**: ESLint rules are enforced - fix all linting errors
- **Naming**: Use descriptive names and follow camelCase convention

### File Structure
```
cyberrazor-vscode/
├── src/                    # Source code
│   ├── extension.ts       # Main extension logic
│   ├── css/              # Styles and CSS
│   └── test/             # Test files
├── out/                   # Compiled JavaScript (generated)
├── package.json           # Extension manifest
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .vscodeignore          # Files to exclude from package
├── README.md              # User documentation
├── CHANGELOG.md           # Version history
└── CONTRIBUTING.md        # This file
```

### Testing
- **Unit Tests**: Write tests for new functionality
- **Integration Tests**: Test VS Code API integration
- **Manual Testing**: Test in Extension Development Host
- **Cross-platform**: Test on Windows, macOS, and Linux

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- --grep "test name"
```

## 📝 Making Changes

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the existing code patterns
- Add appropriate error handling
- Include JSDoc comments for public methods
- Update tests if adding new functionality

### 3. Test Your Changes
- Compile the extension: `npm run compile`
- Launch in Extension Development Host (F5)
- Test all affected functionality
- Run the test suite: `npm test`

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new vulnerability detection feature

- Added support for Rust dependencies
- Enhanced severity classification
- Updated documentation"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 🎯 Contribution Areas

### High Priority
- **Bug fixes** and error handling improvements
- **Performance optimizations** for large projects
- **Additional language support** (C#, Rust, etc.)
- **Enhanced reporting** features

### Medium Priority
- **UI/UX improvements** and accessibility
- **Configuration options** and customization
- **Integration** with additional security tools
- **Documentation** improvements

### Low Priority
- **Cosmetic changes** and styling updates
- **Additional report formats** (PDF, JSON, etc.)
- **Advanced features** and experimental functionality

## 🐛 Bug Reports

### Before Reporting
1. **Check existing issues** to avoid duplicates
2. **Verify the issue** in the latest version
3. **Test in a clean environment** without other extensions
4. **Check VS Code console** for error messages

### Bug Report Template
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Open VS Code
2. Install CyberRazor extension
3. Open a file with vulnerabilities
4. Save the file
5. Expected: vulnerabilities are highlighted
6. Actual: no highlighting occurs

## Environment
- OS: [Windows 10 / macOS 12 / Ubuntu 20.04]
- VS Code: [version]
- CyberRazor: [version]
- Snyk CLI: [version]

## Error Messages
Include any error messages from VS Code console

## Additional Information
Screenshots, logs, or other relevant details
```

## ✨ Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Explain why this feature would be useful

## Proposed Implementation
Suggestions for how to implement the feature

## Alternatives Considered
Other approaches that were considered

## Additional Context
Any other relevant information
```

## 🔧 Development Guidelines

### Code Quality
- **Type Safety**: Use TypeScript types consistently
- **Error Handling**: Implement proper error handling and user feedback
- **Performance**: Consider performance impact of changes
- **Security**: Follow security best practices

### VS Code Integration
- **API Usage**: Use VS Code Extension API correctly
- **User Experience**: Follow VS Code design patterns
- **Accessibility**: Ensure features are accessible
- **Internationalization**: Support multiple languages

### Testing Requirements
- **Coverage**: Aim for high test coverage
- **Edge Cases**: Test error conditions and edge cases
- **Cross-platform**: Test on multiple operating systems
- **Performance**: Test with large projects

## 📚 Documentation

### Code Documentation
- **JSDoc**: Document all public methods and interfaces
- **README**: Keep user documentation up to date
- **CHANGELOG**: Document all changes for each version
- **API Reference**: Document extension configuration and commands

### User Documentation
- **Installation**: Clear installation instructions
- **Configuration**: Document all settings and options
- **Usage**: Provide examples and use cases
- **Troubleshooting**: Common issues and solutions

## 🚀 Release Process

### Version Numbers
- **Major**: Breaking changes or major new features
- **Minor**: New features or significant improvements
- **Patch**: Bug fixes and minor improvements

### Release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG is updated
- [ ] Version numbers are updated
- [ ] Extension compiles successfully
- [ ] Manual testing completed
- [ ] Release notes prepared

## 🤝 Community Guidelines

### Code of Conduct
- **Respect**: Treat all contributors with respect
- **Inclusive**: Welcome contributors from all backgrounds
- **Constructive**: Provide constructive feedback
- **Professional**: Maintain professional communication

### Communication
- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Pull Requests**: Provide clear feedback and guidance
- **Documentation**: Help improve documentation and examples

## 📞 Getting Help

### Resources
- **GitHub Issues**: [Report bugs and request features](https://github.com/nisa-iqbal/cyberrazor-vscode/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/nisa-iqbal/cyberrazor-vscode/discussions)
- **Documentation**: [User guide and API reference](README.md)
- **VS Code Extension API**: [Official documentation](https://code.visualstudio.com/api)

### Contact
- **Maintainer**: NISA IQBAL
- **Email**: [nisa.iqbal@example.com](mailto:nisa.iqbal@example.com)
- **GitHub**: [@nisa-iqbal](https://github.com/nisa-iqbal)

## 🙏 Acknowledgments

Thank you to all contributors who have helped make CyberRazor better:
- Code contributors
- Bug reporters
- Feature requesters
- Documentation writers
- Testers and reviewers

---

**Together, we're building a more secure development experience! 🛡️**

