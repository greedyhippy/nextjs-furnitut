# Railway API Security Setup Guide

## Overview
This Norko e-commerce demo requires secure authentication to your custom GraphQL API hosted on Railway. The authentication method depends on how **your specific GraphQL API** is configured.

## Important Distinction

You have **two different APIs**:

### 1. 🏗️ Railway's Public API 
- **Endpoint**: `https://backboard.railway.com/graphql/v2`
- **Purpose**: Manage Railway resources (projects, services, deployments)
- **Authentication**: Project/Team/Account tokens with specific headers

### 2. 🎯 **Your Norko GraphQL API** (This is what you need)
- **Endpoint**: `https://norko-graphql-api-production.up.railway.app/graphql`
- **Purpose**: Serve your product data
- **Authentication**: Depends on how YOU configured your GraphQL API

## Required Environment Variables

```bash
# Railway GraphQL API Configuration (REQUIRED FOR SECURE DEMO)
RAILWAY_GRAPHQL_ENDPOINT=https://norko-graphql-api-production.up.railway.app/graphql
RAILWAY_API_TOKEN=your-api-token-here  # ← Token for YOUR GraphQL API
```

## Finding Your API Token

Since this is **your custom GraphQL API**, the token could be in several places:

### Option 1: Check Your GraphQL API Environment Variables
1. Go to your Railway dashboard
2. Open your **`norko-graphql-api`** service
3. Click **Variables** tab
4. Look for authentication-related variables:
   - `JWT_SECRET`
   - `API_KEY`
   - `AUTH_TOKEN`
   - `SECRET_KEY`
   - Any variable your GraphQL API uses for authentication

### Option 2: Check Your GraphQL API Source Code
The authentication method depends on how you built your GraphQL API:
- **JWT tokens**: Look for JWT secret keys
- **API keys**: Look for API key validation
- **Custom tokens**: Check your authentication middleware

### Option 3: Create a Project Token (If your API supports it)
1. Go to your `norko-graphql-api` project settings
2. Look for **"Tokens"** or **"API Access"** section
3. Create a new token for frontend access

## Security Best Practices

### ✅ Do:
- Keep your API token in `.env.local` (never commit to git)
- Use strong, randomly generated tokens
- Rotate tokens regularly
- Use different tokens for different environments

### ❌ Don't:
- Expose tokens in client-side code
- Share tokens in public repositories
- Use simple or predictable tokens
- Hardcode tokens in source code

## Testing Your Setup

### 1. Environment Check
Make sure your `.env.local` has both variables set:
```bash
RAILWAY_GRAPHQL_ENDPOINT=https://norko-graphql-api-production.up.railway.app/graphql
RAILWAY_API_TOKEN=your-actual-token-here
```

### 2. Run the Test Script
```bash
npm run test:railway
# or
node test-railway-api.js
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Test Pages
- **Railway Test**: http://localhost:3000/railway-test
- **Products Page**: http://localhost:3000/products

## Expected Behavior

### ✅ With Valid Token:
- API calls succeed
- Products load successfully
- No authentication errors

### ❌ Without Token:
- Application throws authentication errors
- API calls fail with 401 Unauthorized
- Clear error messages guide you to fix the configuration

## Troubleshooting

### "Railway API token is required for authentication"
- Check that `RAILWAY_API_TOKEN` is set in `.env.local`
- Restart your development server after adding the token

### "Authentication failed. Please check your RAILWAY_API_TOKEN"
- Verify the token is correct
- Check if the token has expired
- Ensure the token has the right permissions

### "Access forbidden. Please verify your API token has the required permissions"
- Your token exists but lacks permissions
- Check with your Railway API provider about token permissions

## Next Steps

Once your secure authentication is working:
1. The products page will display real Railway data
2. All API calls will be properly authenticated
3. You can proceed with UI polish and additional features
4. Consider implementing additional security measures like rate limiting

## Support

If you need help finding your Railway API token:
1. Check the Railway dashboard Variables section
2. Look for existing authentication variables
3. Create a new secure token if needed
4. Contact your Railway API provider for token details
