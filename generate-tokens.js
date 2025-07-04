/**
 * Secure Token Generator for Norko GraphQL API
 * Generates cryptographically secure tokens for authentication
 */

const crypto = require('crypto');

console.log('🔐 Generating Secure Tokens for Norko GraphQL API');
console.log('=' .repeat(60));

// Generate JWT Secret (for your GraphQL API server)
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('\n🔑 JWT_SECRET (for your GraphQL API service):');
console.log(jwtSecret);

// Generate API Key (for your frontend)
const apiKey = crypto.randomBytes(32).toString('hex');
console.log('\n🗝️ API_KEY (for your frontend .env.local):');
console.log(apiKey);

// Generate a shorter, user-friendly API key alternative
const shortApiKey = crypto.randomBytes(16).toString('hex');
console.log('\n🎫 SHORT_API_KEY (alternative):');
console.log(shortApiKey);

console.log('\n📋 COPY THESE TO YOUR RAILWAY VARIABLES:');
console.log('=' .repeat(60));
console.log('1. In your GraphQL API service Variables:');
console.log(`   JWT_SECRET=${jwtSecret}`);
console.log(`   AUTH_REQUIRED=true`);
console.log(`   NODE_ENV=production`);

console.log('\n2. In your frontend .env.local:');
console.log(`   RAILWAY_API_TOKEN=${apiKey}`);

console.log('\n⚠️ SECURITY NOTES:');
console.log('- Never commit these tokens to git');
console.log('- Store them securely in Railway Variables');
console.log('- Rotate them regularly');
console.log('- Use different tokens for different environments');
