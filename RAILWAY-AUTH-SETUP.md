# 🔧 Railway Environment Variables Setup

## Step-by-Step Configuration

### 1. 🎯 **Go to Your GraphQL API Service**
1. Open Railway Dashboard
2. Navigate to your `norko-graphql-api` project
3. Click on your GraphQL API service (not the frontend)
4. Go to **Variables** tab

### 2. 🔑 **Add These Variables to Your GraphQL API Service:**

```bash
# Authentication Configuration
JWT_SECRET=generated-64-character-secret-here
API_KEYS=generated-api-key-1,generated-api-key-2
AUTH_REQUIRED=true

# Environment Configuration  
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

# Optional: Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000

# Optional: Logging
LOG_LEVEL=info
LOG_AUTH_ATTEMPTS=true
```

### 3. 🌐 **Update Your Frontend .env.local:**

Use one of the API keys from the API_KEYS list:

```bash
# Replace your current token with one of the generated API keys
RAILWAY_API_TOKEN=one-of-your-generated-api-keys-here
```

### 4. 🔄 **Deploy Your Changes**

After adding variables:
1. **Review staged changes** in Railway
2. **Deploy the changes**
3. **Wait for deployment to complete**
4. **Test the authentication**

## 🧪 **Testing Your Secured API**

### Test 1: Without Authentication (Should Fail)
```bash
curl -X POST https://norko-graphql-api-production.up.railway.app/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name } }"}'
```

Expected Response:
```json
{
  "error": "Authentication required",
  "code": "AUTH_MISSING"
}
```

### Test 2: With Invalid Token (Should Fail)
```bash
curl -X POST https://norko-graphql-api-production.up.railway.app/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer invalid-token" \
  -d '{"query": "{ products { id name } }"}'
```

Expected Response:
```json
{
  "error": "Invalid authentication token",
  "code": "AUTH_INVALID"
}
```

### Test 3: With Valid Token (Should Work)
```bash
curl -X POST https://norko-graphql-api-production.up.railway.app/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-valid-api-key" \
  -d '{"query": "{ products { id name } }"}'
```

Expected Response:
```json
{
  "data": {
    "products": [...]
  }
}
```

## 🛡️ **Security Features Enabled**

### ✅ **Authentication Required**
- All requests must include valid Bearer token
- Multiple API keys supported for different clients

### ✅ **Production Security**
- Schema introspection disabled in production
- GraphQL playground disabled in production
- Error messages sanitized

### ✅ **Rate Limiting**
- 100 requests per 15 minutes per IP
- Prevents API abuse and DoS attacks

### ✅ **CORS Protection**
- Only allows requests from specified origins
- Prevents unauthorized browser access

## 🚨 **Important Security Notes**

### 🔒 **Token Management**
- Never commit tokens to version control
- Rotate tokens regularly (monthly recommended)
- Use different tokens for different environments
- Monitor token usage for suspicious activity

### 📊 **Monitoring**
- Log all authentication attempts
- Monitor for repeated failed attempts
- Set up alerts for unusual access patterns

### 🔄 **Token Rotation**
- Generate new tokens regularly
- Update frontend configuration
- Revoke old tokens after migration

## 📞 **Need Help?**

If you encounter issues:
1. Check Railway deployment logs
2. Verify environment variables are set correctly
3. Test with curl commands first
4. Check frontend console for authentication errors

## 🎯 **Next Steps After Setup**

1. ✅ Configure Railway variables
2. ✅ Deploy changes  
3. ✅ Test authentication
4. ✅ Update frontend token
5. ✅ Verify security works
6. 📈 Monitor API usage
7. 🔄 Set up token rotation schedule
