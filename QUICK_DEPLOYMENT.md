# 🚀 Quick Deployment Guide - CyberRazor VS Code Extension

## ✅ Current Status
Your CyberRazor VS Code extension is **ready for deployment**! The VSIX package has been successfully created and is ready to be published to the Visual Studio Code Marketplace.

## 📦 What's Been Created
- ✅ **VSIX Package**: `cyberrazor-1.0.0.vsix` (32.14 KB)
- ✅ **All Required Files**: Compiled TypeScript, documentation, examples
- ✅ **Deployment Scripts**: `deploy.ps1` and `deploy.bat` for easy deployment

## 🎯 Next Steps to Publish

### 1. Create Publisher Account
1. Go to [https://marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Create a new publisher account
4. Note your Publisher ID (currently set to `nisa-iqbal`)

### 2. Get Personal Access Token
1. Go to [https://dev.azure.com](https://dev.azure.com)
2. Sign in with your Microsoft account
3. Go to User Settings → Personal Access Tokens
4. Create a new token with:
   - **Organization**: All accessible organizations
   - **Scopes**: Marketplace (Publish)
   - **Expiration**: 1 year (recommended)

### 3. Publish Your Extension

#### Option A: Using the Deployment Script (Recommended)
```powershell
# Login first
vsce login nisa-iqbal

# Then publish
.\deploy.ps1 -Publish
```

#### Option B: Manual Commands
```bash
# Login to marketplace
vsce login nisa-iqbal

# Publish extension
vsce publish
```

## 🔑 Required APIs

### 1. **Snyk API** (Primary)
- **Purpose**: Vulnerability scanning
- **Endpoint**: `https://api.snyk.io/v1/`
- **Authentication**: API Token
- **Setup**: Users get their own token from [https://snyk.io](https://snyk.io)

### 2. **VS Code Marketplace API**
- **Purpose**: Publishing extensions
- **Authentication**: Personal Access Token (PAT)
- **Setup**: You need this to publish

## 📋 Pre-Publication Checklist

- [ ] Replace `images/icon.png` with a proper 128x128 PNG icon
- [ ] Update `package.json` publisher field if needed
- [ ] Test the extension locally: `code --install-extension cyberrazor-1.0.0.vsix`
- [ ] Verify all commands work correctly
- [ ] Check that Snyk integration functions properly

## 🚀 Quick Commands

```bash
# Package extension
.\deploy.ps1 -PackageOnly

# Install locally for testing
code --install-extension cyberrazor-1.0.0.vsix

# Publish to marketplace
.\deploy.ps1 -Publish

# Publish with version bump
.\deploy.ps1 -Publish -VersionBump patch
```

## 📚 Documentation Created

- **`DEPLOYMENT_GUIDE.md`**: Complete deployment instructions
- **`INSTALLATION.md`**: User installation guide
- **`README.md`**: Extension overview and features
- **`CHANGELOG.md`**: Version history
- **`CONTRIBUTING.md`**: Development guidelines

## 🎉 After Publication

1. **Verify**: Check [https://marketplace.visualstudio.com](https://marketplace.visualstudio.com)
2. **Test**: Install from marketplace in VS Code
3. **Promote**: Share on social media, GitHub, etc.
4. **Monitor**: Track downloads and user feedback

## 🆘 Need Help?

- **Deployment Issues**: Check `DEPLOYMENT_GUIDE.md`
- **Extension Development**: [VS Code Extension API](https://code.visualstudio.com/api)
- **Marketplace Publishing**: [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview)
- **Snyk Integration**: [Snyk API Documentation](https://docs.snyk.io/snyk-api)

---

**🎯 Your extension is ready to go! Just follow the steps above to publish it to the VS Code Marketplace.**
