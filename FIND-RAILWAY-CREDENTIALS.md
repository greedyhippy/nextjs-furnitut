# 🔑 Finding Your Railway GraphQL Endpoint and API Token

## Quick Start Checklist

1. ✅ **Access Railway Dashboard**: Go to [railway.app](https://railway.app)
2. ✅ **Find Your Project**: Locate your Norko/heater project
3. ✅ **Get Your Endpoint**: Copy your GraphQL service URL
4. ✅ **Get Your Token**: Find your API authentication token
5. ✅ **Update Environment**: Add credentials to `.env.local`
6. ✅ **Test Connection**: Run the test script

---

## 🎯 Step-by-Step Instructions

### Step 1: Access Your Railway Dashboard

1. **Go to [Railway.app](https://railway.app)**
2. **Sign in** with your account
3. **Navigate to your projects** - you should see your Norko/infrared heater project

### Step 2: Find Your GraphQL Endpoint

**Option A: From Service Settings**
1. Click on your **GraphQL/API service** in the project
2. Go to the **"Settings"** tab
3. Look for **"Domains"** section
4. Your endpoint will be something like:
   ```
   https://your-service-name-production.up.railway.app/graphql
   ```

**Option B: From Deployments**
1. Click on your service
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Look for the **"Public URL"** or **"Domain"**
5. Add `/graphql` to the end if it's not already there

**Option C: Custom Domain (if you set one up)**
```
https://your-custom-domain.com/graphql
```

### Step 3: Find Your API Token

**Option A: Environment Variables (Most Common)**
1. In your Railway service, click **"Variables"** tab
2. Look for variables like:
   - `API_KEY`
   - `GRAPHQL_API_KEY` 
   - `JWT_SECRET`
   - `BEARER_TOKEN`
   - `AUTH_TOKEN`

**Option B: Railway Project Token**
1. In your project, click **"Settings"**
2. Go to **"Tokens"** section
3. Create a new token if needed
4. Copy the token value

**Option C: Check Your Deployed Code**
1. Look at your GraphQL server code
2. Check how authentication is configured
3. Some setups don't require tokens for public APIs

### Step 4: Common Railway Endpoint Patterns

Your Railway GraphQL endpoint typically follows one of these patterns:

```bash
# Pattern 1: Service name + production
https://norko-api-production.up.railway.app/graphql

# Pattern 2: Project name + service
https://norko-graphql-production.up.railway.app/graphql

# Pattern 3: Auto-generated name
https://web-production-a1b2.up.railway.app/graphql

# Pattern 4: Custom domain
https://api.norko.com/graphql
```

---

## 🔧 Quick Configuration

Once you have your credentials, update your `.env.local`:

```bash
# Railway GraphQL API Configuration
RAILWAY_GRAPHQL_ENDPOINT=https://your-actual-endpoint.railway.app/graphql
RAILWAY_API_TOKEN=your-actual-token-here
NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT=https://your-actual-endpoint.railway.app/graphql
```

---

## 🧪 Test Your Connection

### Method 1: Use Our Test Script
```bash
node test-railway-connection.js
```

### Method 2: Manual cURL Test
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query":"{ __schema { types { name } } }"}' \
  https://your-endpoint.railway.app/graphql
```

### Method 3: Browser Test (for public APIs)
Visit your GraphQL endpoint in a browser:
```
https://your-endpoint.railway.app/graphql
```

If it's a GraphQL Playground or similar interface, you can test queries directly.

---

## 🚨 Troubleshooting

### "Endpoint not found" or 404 Error
- ✅ Check if `/graphql` is the correct path
- ✅ Try `/api/graphql` or `/api` instead
- ✅ Verify your service is deployed and running

### "Unauthorized" or 401 Error
- ✅ Check if your API requires authentication
- ✅ Verify your token is correct
- ✅ Check if the token should be in headers vs query params

### "CORS Error" in Browser
- ✅ This is normal for GraphQL endpoints
- ✅ Use the test script instead of browser testing

### Can't Find Your Project
- ✅ Check if you're signed into the correct Railway account
- ✅ Ask your team for project access
- ✅ Check if the project is in a different workspace

---

## 💡 Still Can't Find Your Credentials?

### Option 1: Check Your Repository
Look for:
- `.env` files in your Railway project repo
- `railway.json` configuration
- Documentation or README files

### Option 2: Contact Your Team
If this is a team project:
- Ask your backend developer for the GraphQL endpoint
- Request access to the Railway project
- Get the API authentication details

### Option 3: Set Up a New Railway Project
If you need to create a new GraphQL API:
1. Create a new Railway project
2. Deploy a GraphQL server (Apollo, Hasura, etc.)
3. Set up your product data and schema

---

## 📝 Next Steps

Once you have your credentials:

1. **Update `.env.local`** with your actual endpoint and token
2. **Run the test**: `node test-railway-connection.js`
3. **Start the dev server**: `npm run dev`
4. **Visit the test page**: `http://localhost:3000/railway-test`
5. **Check your products**: `http://localhost:3000/products`

---

## 🎯 Example Working Configuration

```bash
# Example .env.local (replace with your actual values)
RAILWAY_GRAPHQL_ENDPOINT=https://norko-api-production.up.railway.app/graphql
RAILWAY_API_TOKEN=ey1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT=https://norko-api-production.up.railway.app/graphql
```

Once configured, your beautiful FRNTR-style product grid will display your real Norko infrared heater products with actual images and data! 🎉
