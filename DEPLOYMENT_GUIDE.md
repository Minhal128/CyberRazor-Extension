# CyberRazor VS Code Extension - Deployment Guide

## Overview

This guide will walk you through the complete process of deploying your CyberRazor VS Code extension to the Visual Studio Code Marketplace so users can download and install it directly from VS Code.

## Prerequisites

### 1. Microsoft Account & Publisher Account
- **Microsoft Account**: You need a Microsoft account to access the Visual Studio Code Marketplace
- **Publisher Account**: Create a publisher account at [https://marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
- **Publisher ID**: Your publisher ID (e.g., `nisa-iqbal`) will be used in the `package.json`

### 2. Personal Access Token (PAT)
- Go to [https://dev.azure.com](https://dev.azure.com)
- Create a Personal Access Token with Marketplace (Publish) permissions
- This token is required for publishing extensions

### 3. Extension Icon
- Replace the placeholder `images/icon.png` with a proper 128x128 PNG icon
- The icon should represent CyberRazor's security scanning functionality

## Required APIs and Services

### 1. Snyk API (Primary Dependency)
**Purpose**: Vulnerability scanning and security analysis
- **API Endpoint**: `https://api.snyk.io/v1/`
- **Authentication**: API Token required
- **Rate Limits**: Varies by plan (Free tier: 100 requests/month)
- **Documentation**: [https://docs.snyk.io/snyk-api](https://docs.snyk.io/snyk-api)

**How to Get Snyk API Token**:
1. Sign up at [https://snyk.io](https://snyk.io)
2. Go to Account Settings → API Tokens
3. Create a new token
4. Users will need to configure this token in the extension settings

### 2. Visual Studio Code Marketplace API
**Purpose**: Publishing and managing extensions
- **API Endpoint**: `https://marketplace.visualstudio.com/_apis/public/gallery`
- **Authentication**: Personal Access Token (PAT)
- **Documentation**: [https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview)

### 3. GitHub API (Optional)
**Purpose**: Repository management and releases
- **API Endpoint**: `https://api.github.com/`
- **Authentication**: GitHub Personal Access Token
- **Documentation**: [https://docs.github.com/en/rest](https://docs.github.com/en/rest)

## Deployment Process

### Step 1: Prepare Your Extension

1. **Update package.json** (if needed):
   ```json
   {
     "publisher": "your-publisher-id",
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/cyberrazor-vscode.git"
     }
   }
   ```

2. **Create a proper icon**:
   - Replace `images/icon.png` with a 128x128 PNG icon
   - Ensure it represents your extension's functionality

3. **Test your extension locally**:
   ```bash
   npm run compile
   npx vsce package
   ```

### Step 2: Create Publisher Account

1. Go to [https://marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Create a new publisher account
4. Note your Publisher ID (e.g., `nisa-iqbal`)

### Step 3: Get Personal Access Token

1. Go to [https://dev.azure.com](https://dev.azure.com)
2. Sign in with your Microsoft account
3. Go to User Settings → Personal Access Tokens
4. Create a new token with:
   - **Organization**: All accessible organizations
   - **Scopes**: Marketplace (Publish)
   - **Expiration**: Set appropriate expiration (recommend 1 year)
5. Copy the token (you won't be able to see it again)

### Step 4: Publish Your Extension

1. **Install vsce globally** (if not already installed):
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Login with your PAT**:
   ```bash
   vsce login your-publisher-id
   ```
   When prompted, enter your Personal Access Token.

3. **Publish the extension**:
   ```bash
   vsce publish
   ```

   Or publish with a specific version:
   ```bash
   vsce publish patch  # 1.0.0 -> 1.0.1
   vsce publish minor  # 1.0.0 -> 1.1.0
   vsce publish major  # 1.0.0 -> 2.0.0
   ```

### Step 5: Verify Publication

1. Go to [https://marketplace.visualstudio.com](https://marketplace.visualstudio.com)
2. Search for your extension by name
3. Verify all information is correct
4. Test installation in VS Code

## Post-Publication

### 1. Update Documentation
- Ensure your README.md is comprehensive
- Update installation instructions
- Add troubleshooting guides

### 2. Monitor Usage
- Check extension analytics in the marketplace
- Monitor user feedback and issues
- Track download statistics

### 3. Maintain and Update
- Respond to user issues
- Release regular updates
- Keep dependencies updated

## Troubleshooting

### Common Issues

1. **"Publisher not found" error**:
   - Ensure you're logged in with the correct publisher ID
   - Verify your PAT has Marketplace permissions

2. **"Extension validation failed"**:
   - Check your `package.json` for required fields
   - Ensure all referenced files exist
   - Verify icon format and size

3. **"Authentication failed"**:
   - Regenerate your Personal Access Token
   - Ensure token has Marketplace (Publish) scope

4. **"Version already exists"**:
   - Increment version number in `package.json`
   - Use `vsce publish patch/minor/major`

### Support Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- [Marketplace Publishing Guide](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview)
- [Snyk API Documentation](https://docs.snyk.io/snyk-api)
- [VS Code Extension Community](https://github.com/microsoft/vscode-extension-samples)

## Security Considerations

### 1. API Token Security
- Never commit API tokens to version control
- Use environment variables for sensitive data
- Rotate tokens regularly

### 2. Extension Security
- Validate all user inputs
- Use HTTPS for all API calls
- Implement proper error handling
- Follow VS Code security best practices

### 3. User Data Privacy
- Clearly state what data is collected
- Implement data minimization
- Provide privacy policy if needed

## Next Steps

After successful publication:

1. **Promote your extension**:
   - Share on social media
   - Write blog posts
   - Present at conferences

2. **Gather feedback**:
   - Monitor GitHub issues
   - Respond to user reviews
   - Implement requested features

3. **Continuous improvement**:
   - Regular updates
   - Performance optimization
   - Feature enhancements

## Quick Reference Commands

```bash
# Compile extension
npm run compile

# Package extension
npx vsce package

# Login to marketplace
vsce login your-publisher-id

# Publish extension
vsce publish

# Publish with version bump
vsce publish patch
vsce publish minor
vsce publish major

# Check extension info
vsce show

# List published extensions
vsce list
```

## Support

For issues with:
- **VS Code Extension Development**: [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- **Marketplace Publishing**: [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview)
- **Snyk Integration**: [Snyk API Documentation](https://docs.snyk.io/snyk-api)

---

**Note**: This guide assumes you have completed the development of your CyberRazor extension. If you encounter any issues during deployment, refer to the troubleshooting section or contact the respective support channels.
