/**
 * GraphQL API Authentication Middleware
 * Add this to your Railway GraphQL API service
 */

// ============================================================================
// OPTION 1: Express + Apollo Server Authentication
// ============================================================================

const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// Environment variables (set these in Railway Variables)
const JWT_SECRET = process.env.JWT_SECRET;
const AUTH_REQUIRED = process.env.AUTH_REQUIRED === 'true';
const API_KEYS = process.env.API_KEYS ? process.env.API_KEYS.split(',') : [];

/**
 * Authentication middleware for Apollo Server context
 */
function createAuthContext({ req }) {
  // Skip authentication in development (optional)
  if (process.env.NODE_ENV === 'development' && !AUTH_REQUIRED) {
    return { authenticated: true, user: { role: 'development' } };
  }

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError('Authorization header required');
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    throw new AuthenticationError('Bearer token required');
  }

  // Method 1: JWT Token Validation
  if (JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { authenticated: true, user: decoded };
    } catch (error) {
      // If JWT fails, try API key validation
    }
  }

  // Method 2: Simple API Key Validation
  if (API_KEYS.includes(token)) {
    return { 
      authenticated: true, 
      user: { 
        role: 'api_client',
        apiKey: token 
      } 
    };
  }

  throw new AuthenticationError('Invalid authentication token');
}

/**
 * Create authenticated Apollo Server
 */
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createAuthContext,
  
  // Security settings
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  
  // Error formatting (don't expose sensitive info)
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    
    // In production, sanitize error messages
    if (process.env.NODE_ENV === 'production') {
      if (error.message.includes('Authentication') || error.message.includes('Authorization')) {
        return new Error('Authentication required');
      }
      return new Error('Internal server error');
    }
    
    return error;
  }
});

// ============================================================================
// OPTION 2: Express Middleware (if not using Apollo)
// ============================================================================

function authenticateRequest(req, res, next) {
  // Skip auth for health checks
  if (req.path === '/health' || req.path === '/ping') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ 
      error: 'Authentication required',
      code: 'AUTH_MISSING'
    });
  }

  const token = authHeader.replace('Bearer ', '');
  
  // Validate token
  if (JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      // Try API key validation
    }
  }

  // API Key validation
  if (API_KEYS.includes(token)) {
    req.user = { role: 'api_client', apiKey: token };
    return next();
  }

  return res.status(401).json({
    error: 'Invalid authentication token',
    code: 'AUTH_INVALID'
  });
}

// Apply to GraphQL endpoint
app.use('/graphql', authenticateRequest);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate JWT token (for testing or user authentication)
 */
function generateJWTToken(payload, expiresIn = '24h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Rate limiting helper
 */
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

app.use('/graphql', apiLimiter);

// ============================================================================
// ENVIRONMENT VARIABLES NEEDED
// ============================================================================

/*
Add these to your Railway GraphQL API service Variables:

JWT_SECRET=your-64-character-jwt-secret-here
API_KEYS=your-api-key-1,your-api-key-2,your-api-key-3
AUTH_REQUIRED=true
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
*/

module.exports = {
  createAuthContext,
  authenticateRequest,
  generateJWTToken
};
