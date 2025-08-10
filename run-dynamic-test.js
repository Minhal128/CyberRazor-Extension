#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

// Available test files
const testFiles = {
    'basic': 'test-scan.js',
    'dynamic': 'dynamic-test.js',
    'simple': 'test.js'
};

console.log('🚀 CyberRazor Dynamic Test Runner');
console.log('================================');
console.log('Available test files:');
Object.keys(testFiles).forEach(key => {
    console.log(`  ${key}: ${testFiles[key]}`);
});
console.log('');

// Get test type from command line argument or default to 'dynamic'
const testType = process.argv[2] || 'dynamic';
const testFile = testFiles[testType];

if (!testFile || !fs.existsSync(testFile)) {
    console.error(`❌ Test file not found: ${testFile}`);
    console.log('Available options:', Object.keys(testFiles).join(', '));
    process.exit(1);
}

console.log(`🎯 Running: ${testFile}`);
console.log(`📁 File path: ${process.cwd()}/${testFile}`);
console.log('');

// Run the test file
const child = spawn('node', [testFile], {
    stdio: 'inherit',
    shell: true
});

child.on('error', (error) => {
    console.error(`❌ Failed to start test: ${error.message}`);
    process.exit(1);
});

child.on('close', (code) => {
    console.log(`\n🏁 Test completed with exit code: ${code}`);
    console.log('💡 Now scan this file with CyberRazor to see vulnerabilities!');
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n🛑 Stopping test server...');
    child.kill('SIGINT');
    process.exit(0);
});
