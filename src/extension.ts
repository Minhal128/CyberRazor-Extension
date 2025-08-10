import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { spawn } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import { marked } from 'marked';

interface SnykScanResult {
  vulnerabilities: any[];
  summary: string;
  timestamp: string;
}

interface VulnerabilityReport {
  title: string;
  severity: string;
  description: string;
  recommendation: string;
  cwe: string;
  cvssScore: number;
}

export function activate(context: vscode.ExtensionContext) {
  console.log('CyberRazor extension is being activated...');
  
  const cyberrazor = new CyberRazorExtension(context);
  cyberrazor.activate();
  
  context.subscriptions.push(cyberrazor);
}

export function deactivate() {}

class CyberRazorExtension implements vscode.Disposable {
  private outputChannel: vscode.OutputChannel;
  private statusBarItem: vscode.StatusBarItem;
  private reportsFolder: string;
  private isActive: boolean = false;

  constructor(private context: vscode.ExtensionContext) {
    this.outputChannel = vscode.window.createOutputChannel('CyberRazor');
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.reportsFolder = path.join(this.context.globalStorageUri.fsPath, 'reports');
    this.ensureReportsFolder();
  }

  public async activate(): Promise<void> {
    this.log('Starting extension initialization...');
    
    try {
      // Register commands to match package.json
      const scanCurrentFileCommand = vscode.commands.registerCommand('cyberrazor.scanCurrentFile', () => this.scanCurrentFile());
      const scanWorkspaceCommand = vscode.commands.registerCommand('cyberrazor.scanWorkspace', () => this.scanWorkspace());
      const viewLastReportCommand = vscode.commands.registerCommand('cyberrazor.viewLastReport', () => this.viewReports());
      const configureSnykTokenCommand = vscode.commands.registerCommand('cyberrazor.configureSnykToken', () => this.configureExtension());
      const showOutputCommand = vscode.commands.registerCommand('cyberrazor.showOutput', () => this.showOutput());
      const showDirectOutputCommand = vscode.commands.registerCommand('cyberrazor.showDirectOutput', () => this.showOutput());
      const forceShowOutputCommand = vscode.commands.registerCommand('cyberrazor.forceShowOutput', () => this.forceShowOutput());
      
      this.context.subscriptions.push(
        scanCurrentFileCommand,
        scanWorkspaceCommand,
        viewLastReportCommand,
        configureSnykTokenCommand,
        showOutputCommand,
        showDirectOutputCommand,
        forceShowOutputCommand
      );

      // Check Snyk installation
      await this.checkSnykInstallation();
      
      this.isActive = true;
      this.log('CyberRazor extension is now active!');
      this.log('Output channel is now visible');
      
    } catch (error) {
      this.logError('Failed to activate extension', error);
    }
    
    this.log('CyberRazor extension activation completed');
  }

  private async checkSnykInstallation(): Promise<void> {
    // Skip Snyk CLI check - using built-in scanner instead
    this.log('Using CyberRazor built-in security scanner (no Snyk CLI required)');
    this.updateStatusBar('CyberRazor Ready');
  }

  private async executeCommand(command: string, args: string[] = [], cwd?: string): Promise<{ success: boolean; stdout: string; stderr: string; code?: number }> {
    return new Promise((resolve) => {
      const isWindows = os.platform() === 'win32';
      
      // For Windows, try to find the actual executable path without using execSync
      let actualCommand = command;
      let actualArgs = args;
      
      if (isWindows) {
        // Try to find the executable in common locations without using execSync
        const possiblePaths = [
          command,
          `${command}.exe`,
          `${command}.cmd`,
          `${command}.bat`,
          `${command}.ps1`
        ];
        
        // Add common npm global paths
        const npmPaths = [
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', command),
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', `${command}.cmd`),
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', `${command}.ps1`),
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', '.bin', command),
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', '.bin', `${command}.cmd`),
          path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', '.bin', `${command}.ps1`)
        ];
        
        possiblePaths.push(...npmPaths);
        
        // Check if any of these paths exist
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            actualCommand = possiblePath;
            break;
          }
        }
        
        // If we still can't find it, try using npx as a fallback
        if (actualCommand === command && !fs.existsSync(command)) {
          // Try to use npx to run the command
          actualCommand = 'npx';
          actualArgs = [command, ...args];
        }
      }
      
      // Log the command being executed for debugging
      this.log(`Executing command: ${actualCommand} ${actualArgs.join(' ')}`);
      
      const child = spawn(actualCommand, actualArgs, {
        cwd: cwd || process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
        env: { 
          ...process.env,
          // Ensure PATH includes common Node.js locations
          PATH: process.env.PATH + (isWindows ? 
            `;${path.join(os.homedir(), 'AppData', 'Roaming', 'npm')};${path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', '.bin')}` :
            `:${path.join(os.homedir(), '.npm-global', 'bin')}`)
        },
        // Don't use shell: true to avoid cmd.exe issues
        shell: false
      });
      
      let stdout = '';
      let stderr = '';
      
      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
      
      child.on('close', (code) => {
        resolve({
          success: code === 0,
          stdout: stdout,
          stderr: stderr,
          code: code || undefined
        });
      });
      
      child.on('error', (error) => {
        this.logError(`Command execution error: ${error.message}`, error);
        this.logError(`Command: ${actualCommand} ${actualArgs.join(' ')}`);
        this.logError(`Working directory: ${cwd || process.cwd()}`);
        resolve({
          success: false,
          stdout: stdout,
          stderr: stderr + `\nExecution error: ${error.message}`,
          code: -1
        });
      });
      
      // Set a timeout to prevent hanging
      setTimeout(() => {
        if (!child.killed) {
          child.kill();
          resolve({
            success: false,
            stdout: stdout,
            stderr: stderr + '\nCommand timed out after 60 seconds',
            code: -1
          });
        }
      }, 60000); // Increased timeout to 60 seconds
    });
  }

  private ensureReportsFolder(): void {
    if (!fs.existsSync(this.reportsFolder)) {
      fs.mkdirSync(this.reportsFolder, { recursive: true });
    }
  }

  private async scanCurrentFile(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active file to scan');
      return;
    }

    const filePath = editor.document.fileName;
    this.log(`Starting scan of current file: ${filePath}`);
    
    try {
      await this.scanFile(filePath);
    } catch (error) {
      this.logError('Error scanning current file', error);
      vscode.window.showErrorMessage('Failed to scan current file');
    }
  }

  private async scanWorkspace(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showWarningMessage('No workspace folder found');
      return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;
    this.log(`Starting workspace scan: ${workspacePath}`);
    
    try {
      await this.scanDirectory(workspacePath);
    } catch (error) {
      this.logError('Error scanning workspace', error);
      vscode.window.showErrorMessage('Failed to scan workspace');
    }
  }

  private async scanFile(filePath: string): Promise<void> {
    this.log(`Scanning file: ${filePath}`);
    
    try {
      const result = await this.runSnykScan(filePath);
      if (result) {
        await this.generateReport(result, filePath);
        vscode.window.showInformationMessage(`Scan completed for ${path.basename(filePath)}`);
      } else {
        this.log('No scan results returned for ' + path.basename(filePath));
        vscode.window.showWarningMessage('No vulnerabilities found or scan failed');
      }
    } catch (error) {
      this.logError('Error during file scan', error);
      vscode.window.showErrorMessage('Scan failed');
    }
  }

  private async scanDirectory(dirPath: string): Promise<void> {
    this.log(`Scanning directory: ${dirPath}`);
    
    try {
      const result = await this.runSnykScan(dirPath);
      if (result) {
        await this.generateReport(result, dirPath);
        vscode.window.showInformationMessage('Workspace scan completed');
      } else {
        this.log('No scan results returned for directory');
        vscode.window.showWarningMessage('No vulnerabilities found or scan failed');
      }
    } catch (error) {
      this.logError('Error during directory scan', error);
      vscode.window.showErrorMessage('Workspace scan failed');
    }
  }

  private async runSnykScan(targetPath: string): Promise<SnykScanResult | null> {
    try {
      this.log(`Starting safe vulnerability scan for: ${targetPath}`);
      
      // Use hardcoded vulnerability patterns instead of Snyk CLI
      this.log('Snyk CLI not available, using fallback scanning method');
      const scanResult = await this.runFallbackScan(targetPath);
      
      if (scanResult) {
        // Log scan results in JSON format
        this.logScanResultsAsJson(scanResult, targetPath);
        return scanResult;
      }
      
      return null;
      
    } catch (error) {
      this.logError('Error running vulnerability scan', error);
      return null;
    }
  }
  
  private async runFallbackScan(targetPath: string): Promise<SnykScanResult | null> {
    try {
      this.log('Running fallback vulnerability scan...');
      
      const vulnerabilities: VulnerabilityReport[] = [];
      const isDirectory = fs.statSync(targetPath).isDirectory();
      
      if (isDirectory) {
        // Scan directory recursively
        await this.scanDirectoryForVulnerabilities(targetPath, vulnerabilities);
      } else {
        // Scan single file
        await this.scanFileForVulnerabilities(targetPath, vulnerabilities);
      }
      
      const result: SnykScanResult = {
        vulnerabilities: vulnerabilities.map(vuln => ({
          title: vuln.title,
          severity: vuln.severity,
          description: vuln.description,
          recommendation: vuln.recommendation,
          cwe: vuln.cwe,
          cvssScore: vuln.cvssScore
        })),
        summary: `Found ${vulnerabilities.length} potential security issues`,
        timestamp: new Date().toISOString()
      };
      
      return result;
      
    } catch (error) {
      this.logError('Error in fallback scan', error);
      return null;
    }
  }
  
  private async scanDirectoryForVulnerabilities(dirPath: string, vulnerabilities: VulnerabilityReport[]): Promise<void> {
    try {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !this.shouldSkipDirectory(file)) {
          await this.scanDirectoryForVulnerabilities(fullPath, vulnerabilities);
        } else if (stat.isFile() && this.shouldScanFile(file)) {
          await this.scanFileForVulnerabilities(fullPath, vulnerabilities);
        }
      }
    } catch (error) {
      this.log(`Error scanning directory ${dirPath}: ${error}`);
    }
  }
  
  private shouldSkipDirectory(dirName: string): boolean {
    const skipDirs = ['node_modules', '.git', '.svn', '.hg', 'vendor', 'build', 'dist', 'out', '.next', '.nuxt', 'target'];
    return skipDirs.includes(dirName) || dirName.startsWith('.');
  }
  
  private shouldScanFile(fileName: string): boolean {
    const extensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.php', '.rb', '.go', '.cs', '.cpp', '.c', '.h', '.json', '.xml', '.yaml', '.yml', '.sql', '.sh', '.bat', '.ps1'];
    return extensions.some(ext => fileName.toLowerCase().endsWith(ext));
  }
  
  private async scanFileForVulnerabilities(filePath: string, vulnerabilities: VulnerabilityReport[]): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      
      // Define vulnerability patterns (hardcoded security rules)
      const patterns = this.getVulnerabilityPatterns();
      
      for (const pattern of patterns) {
        const matches = content.match(new RegExp(pattern.regex, 'gi'));
        if (matches) {
          vulnerabilities.push({
            title: `${pattern.title} in ${fileName}`,
            severity: pattern.severity,
            description: `${pattern.description} Found in file: ${filePath}`,
            recommendation: pattern.recommendation,
            cwe: pattern.cwe,
            cvssScore: pattern.cvssScore
          });
          
          this.log(`Found ${pattern.title} in ${fileName}`);
        }
      }
      
    } catch (error) {
      this.log(`Error scanning file ${filePath}: ${error}`);
    }
  }
  
  private getVulnerabilityPatterns(): Array<{
    title: string;
    regex: string;
    severity: string;
    description: string;
    recommendation: string;
    cwe: string;
    cvssScore: number;
  }> {
    return [
      {
        title: 'Hardcoded Password',
        regex: '(password|pwd)\\s*[=:]\\s*["\'][^"\'\\ ]+["\']',
        severity: 'high',
        description: 'Hardcoded passwords in source code pose a significant security risk.',
        recommendation: 'Use environment variables or secure configuration management for passwords.',
        cwe: 'CWE-798',
        cvssScore: 7.5
      },
      {
        title: 'Potential SQL Injection',
        regex: '(SELECT|INSERT|UPDATE|DELETE).*\\+.*["\']',
        severity: 'high',
        description: 'SQL queries constructed using string concatenation may be vulnerable to SQL injection.',
        recommendation: 'Use parameterized queries or prepared statements.',
        cwe: 'CWE-89',
        cvssScore: 8.1
      },
      {
        title: 'Hardcoded API Key',
        regex: '(api[_-]?key|token|secret)\\s*[=:]\\s*["\'][a-zA-Z0-9]{20,}["\']',
        severity: 'high',
        description: 'API keys or tokens should not be hardcoded in source code.',
        recommendation: 'Store API keys in environment variables or secure key management systems.',
        cwe: 'CWE-798',
        cvssScore: 7.5
      },
      {
        title: 'Potential XSS Vulnerability',
        regex: 'innerHTML\\s*=|document\\.write\\s*\\(',
        severity: 'medium',
        description: 'Direct DOM manipulation may lead to Cross-Site Scripting (XSS) vulnerabilities.',
        recommendation: 'Use safe DOM manipulation methods and sanitize user input.',
        cwe: 'CWE-79',
        cvssScore: 6.1
      },
      {
        title: 'Insecure HTTP Usage',
        regex: 'http://[^\\s"\'\\ ]+',
        severity: 'medium',
        description: 'HTTP URLs transmit data in plaintext and should be avoided.',
        recommendation: 'Use HTTPS instead of HTTP for all network communications.',
        cwe: 'CWE-319',
        cvssScore: 5.3
      },
      {
        title: 'Weak Random Number Generation',
        regex: 'Math\\.random\\(\\)',
        severity: 'medium',
        description: 'Math.random() is not cryptographically secure and should not be used for security purposes.',
        recommendation: 'Use cryptographically secure random number generators for security-sensitive operations.',
        cwe: 'CWE-338',
        cvssScore: 5.0
      },
      {
        title: 'Console Log with Sensitive Data',
        regex: 'console\\.(log|info|warn|error).*?(password|token|key|secret)',
        severity: 'low',
        description: 'Logging sensitive information can lead to information disclosure.',
        recommendation: 'Remove or sanitize sensitive data from console logs.',
        cwe: 'CWE-532',
        cvssScore: 4.3
      },
      {
        title: 'Eval Usage',
        regex: '\\beval\\s*\\(',
        severity: 'high',
        description: 'Use of eval() can lead to code injection vulnerabilities.',
        recommendation: 'Avoid using eval(). Use safer alternatives like JSON.parse() for parsing data.',
        cwe: 'CWE-95',
        cvssScore: 8.8
      },
      {
        title: 'Insecure Deserialization',
        regex: 'JSON\\.parse\\([^)]*\\+',
        severity: 'medium',
        description: 'Parsing JSON from untrusted sources without validation can be dangerous.',
        recommendation: 'Validate and sanitize data before parsing JSON.',
        cwe: 'CWE-502',
        cvssScore: 6.8
      },
      {
        title: 'Potential Command Injection',
        regex: 'exec\\s*\\(.*\\+|system\\s*\\(.*\\+',
        severity: 'high',
        description: 'Command execution with user-controlled input may lead to command injection.',
        recommendation: 'Use parameterized command execution or sanitize input properly.',
        cwe: 'CWE-78',
        cvssScore: 8.8
      }
    ];
  }
  
  private logScanResultsAsJson(scanResult: SnykScanResult, targetPath: string): void {
    const jsonReport = {
      scan_info: {
        timestamp: scanResult.timestamp,
        target_path: targetPath,
        scanner: 'CyberRazor Fallback Scanner',
        total_vulnerabilities: scanResult.vulnerabilities.length
      },
      summary: {
        high: scanResult.vulnerabilities.filter((v: any) => v.severity === 'high').length,
        medium: scanResult.vulnerabilities.filter((v: any) => v.severity === 'medium').length,
        low: scanResult.vulnerabilities.filter((v: any) => v.severity === 'low').length
      },
      vulnerabilities: scanResult.vulnerabilities
    };
    
    this.log('=== SCAN RESULTS (JSON FORMAT) ===');
    this.log(JSON.stringify(jsonReport, null, 2));
    this.log('=== END SCAN RESULTS ===');
  }

  private async generateReport(scanResult: SnykScanResult, targetPath: string): Promise<void> {
    try {
      const fileName = path.basename(targetPath);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportFileName = `cyberrazor-scan-${fileName}-${timestamp}.html`;
      const reportPath = path.join(this.reportsFolder, reportFileName);

      const htmlContent = this.generateHtmlReport(scanResult, targetPath);
      fs.writeFileSync(reportPath, htmlContent);

      this.log(`Report generated: ${reportPath}`);
      
      // Show the report
      const reportUri = vscode.Uri.file(reportPath);
      await vscode.window.showTextDocument(reportUri);
      
    } catch (error) {
      this.logError('Error generating report', error);
    }
  }

  private generateHtmlReport(scanResult: SnykScanResult, targetPath: string): string {
    const vulnerabilities = scanResult.vulnerabilities || [];
    const hasVulnerabilities = vulnerabilities.length > 0;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberRazor Security Scan Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .summary {
            padding: 20px 30px;
            border-bottom: 1px solid #eee;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .summary-item {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .summary-item h3 {
            margin: 0 0 10px 0;
            color: #333;
        }
        .summary-item .number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .vulnerabilities {
            padding: 30px;
        }
        .vulnerability {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        .vulnerability-header {
            padding: 15px 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .vulnerability-title {
            font-weight: bold;
            color: #333;
        }
        .severity {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
        }
        .severity.high {
            background: #ffebee;
            color: #c62828;
        }
        .severity.medium {
            background: #fff3e0;
            color: #ef6c00;
        }
        .severity.low {
            background: #e8f5e8;
            color: #2e7d32;
        }
        .vulnerability-content {
            padding: 20px;
        }
        .vulnerability-description {
            margin-bottom: 15px;
            color: #555;
        }
        .vulnerability-recommendation {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #2196f3;
        }
        .no-vulnerabilities {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        .no-vulnerabilities h2 {
            color: #4caf50;
            margin-bottom: 10px;
        }
        .timestamp {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 CyberRazor Security Scan</h1>
            <p>Comprehensive vulnerability assessment report</p>
        </div>
        
        <div class="summary">
            <h2>Scan Summary</h2>
            <p><strong>Target:</strong> ${targetPath}</p>
            <p><strong>Scan Date:</strong> ${new Date(scanResult.timestamp).toLocaleString()}</p>
            
            <div class="summary-grid">
                <div class="summary-item">
                    <h3>Total Vulnerabilities</h3>
                    <div class="number">${vulnerabilities.length}</div>
                </div>
                <div class="summary-item">
                    <h3>High Severity</h3>
                    <div class="number">${vulnerabilities.filter(v => v.severity === 'high').length}</div>
                </div>
                <div class="summary-item">
                    <h3>Medium Severity</h3>
                    <div class="number">${vulnerabilities.filter(v => v.severity === 'medium').length}</div>
                </div>
                <div class="summary-item">
                    <h3>Low Severity</h3>
                    <div class="number">${vulnerabilities.filter(v => v.severity === 'low').length}</div>
                </div>
            </div>
        </div>
        
        <div class="vulnerabilities">
            <h2>Vulnerability Details</h2>
            
            ${hasVulnerabilities ? 
                vulnerabilities.map(vuln => `
                    <div class="vulnerability">
                        <div class="vulnerability-header">
                            <div class="vulnerability-title">${vuln.title || 'Unknown Vulnerability'}</div>
                            <span class="severity ${vuln.severity || 'low'}">${(vuln.severity || 'low').toUpperCase()}</span>
                        </div>
                        <div class="vulnerability-content">
                            <div class="vulnerability-description">
                                ${vuln.description || 'No description available'}
                            </div>
                            ${vuln.recommendation ? `
                                <div class="vulnerability-recommendation">
                                    <strong>Recommendation:</strong> ${vuln.recommendation}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('') :
                `
                <div class="no-vulnerabilities">
                    <h2>✅ No Vulnerabilities Found</h2>
                    <p>Great job! No security vulnerabilities were detected in this scan.</p>
                </div>
                `
            }
        </div>
        
        <div class="timestamp">
            Report generated by CyberRazor Extension on ${new Date().toLocaleString()}
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  private async viewReports(): Promise<void> {
    try {
      const reportFiles = fs.readdirSync(this.reportsFolder)
        .filter(file => file.endsWith('.html'))
        .sort((a, b) => {
          const statA = fs.statSync(path.join(this.reportsFolder, a));
          const statB = fs.statSync(path.join(this.reportsFolder, b));
          return statB.mtime.getTime() - statA.mtime.getTime();
        });

      if (reportFiles.length === 0) {
        vscode.window.showInformationMessage('No reports found. Run a scan first.');
        return;
      }

      const selectedFile = await vscode.window.showQuickPick(reportFiles, {
        placeHolder: 'Select a report to view'
      });

      if (selectedFile) {
        const reportPath = path.join(this.reportsFolder, selectedFile);
        const reportUri = vscode.Uri.file(reportPath);
        await vscode.window.showTextDocument(reportUri);
      }
    } catch (error) {
      this.logError('Error viewing reports', error);
      vscode.window.showErrorMessage('Failed to view reports');
    }
  }

  private async configureExtension(): Promise<void> {
    try {
      const snykToken = await vscode.window.showInputBox({
        prompt: 'Enter your Snyk API token (optional)',
        placeHolder: 'Leave empty if you don\'t have a Snyk token',
        password: true
      });

      if (snykToken !== undefined) {
        const config = vscode.workspace.getConfiguration('cyberrazor');
        await config.update('snykToken', snykToken, vscode.ConfigurationTarget.Global);
        
        if (snykToken) {
          vscode.window.showInformationMessage('Snyk token configured successfully');
        } else {
          vscode.window.showInformationMessage('Snyk token cleared');
        }
      }
    } catch (error) {
      this.logError('Error configuring extension', error);
      vscode.window.showErrorMessage('Failed to configure extension');
    }
  }

  private log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`[${timestamp}] ${message}`);
    console.log(`[${timestamp}] ${message}`);
  }

  private logError(message: string, error?: any): void {
    const timestamp = new Date().toLocaleTimeString();
    const errorMessage = error ? `${message}: ${JSON.stringify(error, null, 2)}` : message;
    this.outputChannel.appendLine(`[${timestamp}] ERROR: ${errorMessage}`);
    console.error(`[${timestamp}] ERROR: ${errorMessage}`);
  }

  private updateStatusBar(text: string): void {
    this.statusBarItem.text = `$(shield) ${text}`;
    this.statusBarItem.tooltip = 'CyberRazor Security Scanner';
    this.statusBarItem.show();
  }
  
  private showOutput(): void {
    this.outputChannel.show();
  }
  
  private forceShowOutput(): void {
    this.outputChannel.show(true);
    this.log('Output panel forced to show');
  }

  public dispose(): void {
    this.outputChannel.dispose();
    this.statusBarItem.dispose();
  }
}