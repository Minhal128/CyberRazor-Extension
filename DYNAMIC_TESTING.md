# 🚀 CyberRazor Dynamic Testing Guide

This guide shows you how to run dynamic test files to verify that CyberRazor can detect vulnerabilities and display them in the VS Code output panel.

## 📁 Available Test Files

### 1. **Basic Test** (`test-scan.js`)
- Simple Express server with vulnerable dependencies
- Good for basic functionality testing

### 2. **Dynamic Test** (`dynamic-test.js`) ⭐ **RECOMMENDED**
- Comprehensive test server with multiple vulnerability types
- Includes prototype pollution, command injection, and path traversal
- Interactive web interface at `http://localhost:3000`

### 3. **Simple Test** (`test.js`)
- Minimal test file for quick verification

## 🎯 Quick Start

### Option 1: Use npm scripts (Easiest)
```bash
# Run the recommended dynamic test
npm start

# Or run specific tests
npm run test:dynamic
npm run test:basic
npm run test:simple
```

### Option 2: Use the test runner
```bash
# Run with test runner (shows available options)
npm run test:run

# Run specific test type
node run-dynamic-test.js dynamic
node run-dynamic-test.js basic
node run-dynamic-test.js simple
```

### Option 3: Direct execution
```bash
# Run files directly
node dynamic-test.js
node test-scan.js
node test.js
```

## 🔍 Testing CyberRazor Output

### Step 1: Start a Test Server
```bash
npm start
```

### Step 2: Scan with CyberRazor
1. Open VS Code
2. Install and activate the CyberRazor extension
3. Configure your Snyk API token
4. Open the test file (`dynamic-test.js`)
5. Right-click in the editor and select **"CyberRazor: Scan Current File"**

### Step 3: View Results
The VS Code output panel should display:
- ✅ **Vulnerability details** with severity levels
- ✅ **Package names** with security issues
- ✅ **CVE numbers** for each vulnerability
- ✅ **Exploit descriptions** explaining what's vulnerable
- ✅ **Recommendations** for fixing issues

## 🎭 Expected Vulnerabilities

### From Dependencies:
- **express@4.17.1**: Prototype pollution, command injection vulnerabilities
- **lodash@4.17.15**: Prototype pollution via `_.merge()` function

### From Code:
- **Prototype Pollution**: `_.merge(user, req.body)` can pollute Object.prototype
- **Command Injection**: `exec(command)` executes user input directly
- **Path Traversal**: `fs.readFile(filePath)` can read any file on system

## 🌐 Interactive Testing

When you run `npm start`, visit `http://localhost:3000` to see:

### Available Test Endpoints:
- **GET /** - Main page with vulnerability information
- **POST /api/user** - Prototype pollution test
- **GET /api/execute?cmd=COMMAND** - Command injection test
- **GET /api/file?path=PATH** - Path traversal test

### Example Test Requests:
```bash
# Test prototype pollution
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"__proto__":{"isAdmin":true}}'

# Test command injection
curl "http://localhost:3000/api/execute?cmd=whoami"

# Test path traversal
curl "http://localhost:3000/api/file?path=../../../etc/passwd"
```

## 🔧 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution**: Install dependencies first:
```bash
npm install express@4.17.1 lodash@4.17.15
```

### Issue: Port 3000 already in use
**Solution**: Change the port in the test file or kill existing processes:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Issue: No vulnerabilities detected
**Solutions**:
1. Ensure Snyk CLI is installed: `npm install -g snyk`
2. Verify Snyk token is configured
3. Check that the test file contains vulnerable dependencies
4. Try scanning the workspace instead of just the file

## 📊 Expected Output Example

When scanning `dynamic-test.js`, you should see output like:

```
[2:30:45 PM] Starting scan for current file...
[2:30:45 PM] Checking Snyk CLI installation...
[2:30:45 PM] Snyk CLI version: 1.1234.5
[2:30:45 PM] Running Snyk scan...
[2:30:45 PM] Raw Snyk output length: 2048 characters
[2:30:45 PM] Found 3 vulnerabilities in dependencies

Vulnerabilities Found:
- express@4.17.1: High severity - Prototype pollution vulnerability
- lodash@4.17.15: Medium severity - Command injection vulnerability
- Code analysis: Multiple security issues detected
```

## 🎯 Next Steps

1. **Test the extension** with these dynamic files
2. **Verify output visibility** in VS Code
3. **Try different vulnerability types** by modifying the test files
4. **Create your own test scenarios** based on your needs

## 📝 Customizing Tests

You can modify any of the test files to:
- Add new vulnerability types
- Change dependency versions
- Test specific security scenarios
- Add more complex application logic

The test files are intentionally vulnerable for demonstration purposes. **Never use these patterns in production code!**
