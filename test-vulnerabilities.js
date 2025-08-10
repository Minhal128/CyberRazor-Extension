// Test file with intentional security vulnerabilities for CyberRazor scanning

// Hardcoded password vulnerability
const password = "admin123";
const userPassword = 'mySecretPass';

// Hardcoded API key vulnerability  
const apiKey = "sk_live_[REDACTED_FOR_SECURITY]";
const api_token = "ghp_[REDACTED_FOR_SECURITY]";

// SQL Injection vulnerability
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId + " AND status = 'active'";
    return db.query(query);
}

// XSS vulnerability
function displayUserInput(input) {
    document.getElementById('output').innerHTML = input;
    document.write("<div>" + userInput + "</div>");
}

// Insecure HTTP usage
const apiUrl = "http://api.example.com/users";
fetch("http://insecure-api.com/data");

// Weak random number generation
function generateToken() {
    return Math.random().toString(36);
}

// Console logging sensitive data
function login(username, password) {
    console.log("Login attempt with password:", password);
    console.error("Token validation failed for token:", apiToken);
}

// Eval usage
function executeCode(userCode) {
    eval(userCode);
}

// Insecure JSON parsing
function parseData(jsonString) {
    return JSON.parse(jsonString + additionalData);
}

// Command injection potential
function runCommand(userInput) {
    exec("ls -la " + userInput);
    system("cat " + fileName);
}
