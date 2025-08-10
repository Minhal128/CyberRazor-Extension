console.log("Hello, World!");
console.log("This is a test file.");

// This is a test script for CyberRazor extension
const testDependency = {
  name: "lodash",
  version: "4.17.15" // This version has known vulnerabilities
};

// Simulating a vulnerable code pattern
function unsafeEval(code) {
  return eval(code); // Unsafe eval usage - should be detected in security scans
}

module.exports = {
  testDependency,
  unsafeEval
};