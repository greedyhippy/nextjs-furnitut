# 🔧 Adding Authentication to Your Apollo Server v4

## Step 1: Install Dependencies

In your `norko-graphql-api` folder:

```bash
npm install jsonwebtoken express-rate-limit
```

## Step 2: Update Your server.js

Here are the key changes you need to make to your existing `server.js`:

### Add Authentication Imports (at the top):

```javascript
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Authentication config
const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY;
const AUTH_REQUIRED = process.env.AUTH_REQUIRED !== 'false';
```

### Add Authentication Context Function:

```javascript
async function createAuthContext({ req }) {
  // Skip auth for health checks and introspection in dev
  if (req.body?.query?.includes('__schema') && process.env.NODE_ENV === 'production') {
    throw new Error('Schema introspection disabled in production');
  }

  if (!AUTH_REQUIRED) {
    return { authenticated: true, user: { role: 'development' } };
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header required');
  }

  const token = authHeader.replace('Bearer ', '');
  
  // Check if token matches API_KEY
  if (token === API_KEY) {
    return { 
      authenticated: true, 
      user: { role: 'api_client' } 
    };
  }

  throw new Error('Invalid authentication token');
}
```

### Add Rate Limiting:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { error: 'Too many requests' }
});
```

### Update Apollo Server Creation:

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  formatError: (formattedError) => {
    console.error('GraphQL Error:', formattedError.message);
    
    if (process.env.NODE_ENV === 'production' && 
        !formattedError.message.includes('Authentication')) {
      return new Error('Internal server error');
    }
    
    return formattedError;
  }
});
```

### Update Express Middleware:

```javascript
app.use('/graphql',
  limiter,
  cors({ origin: process.env.CORS_ORIGIN || '*' }),
  express.json(),
  expressMiddleware(server, {
    context: createAuthContext  // Add this line
  })
);
```

## Step 3: Test Your Changes

1. **Save your updated server.js**
2. **Test locally**: `npm run dev`
3. **Test authentication**:

```bash
# Should fail (no auth):
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name } }"}'

# Should work (with auth):
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY_FROM_RAILWAY" \
  -d '{"query": "{ products { id name } }"}'
```

## Step 4: Deploy to Railway

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add authentication to GraphQL API"
   git push
   ```

2. **Railway will auto-deploy** your secured API

## Step 5: Update Frontend

In your frontend `.env.local`, use your Railway `API_KEY` value:

```bash
RAILWAY_API_TOKEN=your-actual-api-key-from-railway-variables
```

## ✅ Verification Checklist

- [ ] Dependencies installed (`jsonwebtoken`, `express-rate-limit`)
- [ ] Authentication context function added
- [ ] Apollo Server updated with `context: createAuthContext`
- [ ] Rate limiting applied
- [ ] Tested locally (fails without auth, works with auth)
- [ ] Deployed to Railway
- [ ] Frontend token updated
- [ ] End-to-end test successful

## 🚨 Important Notes

- Your **Railway `API_KEY` variable** becomes your frontend's **`RAILWAY_API_TOKEN`**
- Test locally first before deploying
- Make sure to commit and push to trigger Railway deployment
- Check Railway deployment logs if there are issues

Need help with any specific step? Let me know! 🚀
