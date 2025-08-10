# 🔧 Fix VS Code Extension Snyk Error

## 🚨 **Current Error:**
```
ERROR: Snyk scan execution error:
{
  "errno": -4058,
  "code": "ENOENT",
  "syscall": "spawn C:\\Windows\\system32\\cmd.exe"
}
```

## ✅ **SOLUTION STEPS:**

### **Step 1: Reload VS Code Extension**
1. **Close VS Code completely**
2. **Reopen VS Code**
3. **Open your project folder**
4. **Wait for extension to reload**

### **Step 2: Verify Snyk Installation**
```bash
# Check if Snyk is working
snyk --version

# If not found, reinstall:
npm install -g snyk
```

### **Step 3: Test the Extension**
1. **Open any .js file** in your project
2. **Right-click** → "CyberRazor: Scan Current File"
3. **Check output panel** for results

### **Step 4: If Still Not Working**
1. **Uninstall extension** from VS Code
2. **Reinstall extension** from the .vsix file
3. **Restart VS Code**

## 🔄 **Alternative: Use Standalone Scanner**

If VS Code extension still doesn't work, use the standalone scanner:

```bash
# Run the quick scanner
node quick-scan.js
```

## 📋 **Expected Output After Fix:**
```
[2:14:06 AM] Found Snyk at: C:\Users\Minhal Rizvi\AppData\Roaming\npm\snyk.cmd
[2:14:06 AM] Executing Snyk scan at path: h:\Development\aashiarts-backend\server.js
[2:14:06 AM] Received Snyk scan results, processing...
[2:14:06 AM] Found 3 vulnerabilities in dependencies
```

## 🎯 **Next Steps:**
1. **Try reloading VS Code first**
2. **If that doesn't work, use the standalone scanner**
3. **Report back with results**
