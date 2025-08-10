# CyberRazor Output Panel Usage Guide

## How to View Scan Output

The CyberRazor extension now has improved output visibility. Here are the different ways to view scan results:

### Method 1: Force Show Output Panel (Recommended)
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "CyberRazor: Force Show Output Panel"
3. Press Enter
4. The output panel will open and show scan results

### Method 2: Show Output Log
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "CyberRazor: Show Output Log"
3. Press Enter

### Method 3: Show Global Output Log
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "CyberRazor: Show Global Output Log"
3. Press Enter

### Method 4: Automatic Output Display
- When you run a scan, the output panel will automatically open
- The panel shows detailed logs of the scanning process
- All scan results are logged with timestamps

## How to Run Scans

### Scan Current File
1. Open a file in the editor
2. Right-click in the editor
3. Select "CyberRazor: Scan Current File"
4. The output panel will show the scan results

### Scan Workspace
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "CyberRazor: Scan Workspace"
3. Press Enter
4. The output panel will show the scan results

## What You'll See in the Output

The output panel will display:
- Timestamped log messages
- Snyk CLI version information
- Scan execution details
- Raw scan results
- Vulnerability summaries
- Error messages (if any)

## Troubleshooting

### If you don't see output:
1. Try "CyberRazor: Force Show Output Panel" command
2. Check if Snyk CLI is installed: `npm install -g snyk`
3. Make sure you have a `package.json` file in your workspace
4. Check the VS Code Output panel (View → Output) and select "CyberRazor Security Scanner"

### If scans aren't working:
1. Install Snyk CLI: `npm install -g snyk`
2. Configure Snyk token: Run "CyberRazor: Configure Snyk Token"
3. Make sure you're in a directory with a `package.json` file

## Test Files

Use the provided test files to verify functionality:
- `test-scan.js` - A simple Express.js application
- `test-package.json` - Package.json with test dependencies

## Output Panel Features

- **Real-time logging**: All scan activities are logged immediately
- **Error visibility**: Errors are highlighted and the panel opens automatically
- **Detailed information**: Shows command execution, results parsing, and vulnerability counts
- **Persistent display**: Output remains visible until manually closed
- **Multiple access methods**: Several ways to open the output panel

## Commands Summary

| Command | Description |
|---------|-------------|
| `cyberrazor.forceShowOutput` | Force open and clear the output panel |
| `cyberrazor.showOutput` | Show the extension's output channel |
| `cyberrazor.showDirectOutput` | Show the global output channel |
| `cyberrazor.scanCurrentFile` | Scan the currently open file |
| `cyberrazor.scanWorkspace` | Scan the entire workspace |
| `cyberrazor.viewLastReport` | View the last generated report |
| `cyberrazor.configureSnykToken` | Configure Snyk API token |
