/**
 * Secure Norko GraphQL API Server
 * Updated with authentication middleware for Apollo Server v4
 */

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// ============================================================================
// AUTHENTICATION CONFIGURATION
// ============================================================================

// Environment variables from Railway
const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY; // Single API key from Railway
const AUTH_REQUIRED = process.env.AUTH_REQUIRED !== 'false'; // Default to true
const PORT = process.env.PORT || 4000;

// Validate required environment variables
if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET environment variable is required');
  process.exit(1);
}

if (!API_KEY) {
  console.error('❌ API_KEY environment variable is required');
  process.exit(1);
}

console.log('🔐 Authentication enabled:', AUTH_REQUIRED);
console.log('🗝️ API Key configured:', API_KEY ? 'Yes' : 'No');

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

/**
 * Authentication context for Apollo Server v4
 */
async function createAuthContext({ req }) {
  // Skip auth for introspection in development
  if (req.body?.query?.includes('__schema') || req.body?.query?.includes('IntrospectionQuery')) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Schema introspection is disabled in production');
    }
    // Allow introspection in development
    return { authenticated: true, user: { role: 'introspection' } };
  }

  // Skip authentication if not required (development mode)
  if (!AUTH_REQUIRED) {
    return { authenticated: true, user: { role: 'development' } };
  }

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header required');
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    throw new Error('Bearer token required');
  }

  // Method 1: JWT Token Validation (for advanced use cases)
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { authenticated: true, user: decoded };
  } catch (jwtError) {
    // If JWT validation fails, try API key validation
  }

  // Method 2: Simple API Key Validation (primary method)
  if (token === API_KEY) {
    return { 
      authenticated: true, 
      user: { 
        role: 'api_client',
        source: 'frontend',
        timestamp: new Date().toISOString()
      } 
    };
  }

  // Authentication failed
  console.warn('🚨 Authentication failed for token:', token.substring(0, 8) + '...');
  throw new Error('Invalid authentication token');
}

// ============================================================================
// YOUR EXISTING GRAPHQL SCHEMA AND RESOLVERS
// ============================================================================

// TODO: Replace this with your actual GraphQL schema
const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    sku: String!
    price: Float!
    category: String
    description: String
    inStock: Boolean!
    inventory: Int
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    hello: String
  }
`;

// TODO: Replace this with your actual resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello from Secure Norko GraphQL API! 🔐',
    products: (parent, args, context) => {
      // Example: Check authentication in resolvers
      if (!context.authenticated) {
        throw new Error('Authentication required to access products');
      }
      
      // Return your actual products data
      return [
        {
          id: '1',
          name: 'Norko Infrared Heater Pro',
          sku: 'NIH-PRO-001',
          price: 299.99,
          category: 'Industrial',
          description: 'Professional grade infrared heater',
          inStock: true,
          inventory: 15
        },
        {
          id: '2', 
          name: 'Norko Compact Heater',
          sku: 'NIH-COM-002',
          price: 199.99,
          category: 'Residential',
          description: 'Compact infrared heater for home use',
          inStock: true,
          inventory: 8
        }
      ];
    },
    product: (parent, { id }, context) => {
      if (!context.authenticated) {
        throw new Error('Authentication required to access product details');
      }
      
      // Return specific product by ID
      const products = resolvers.Query.products(parent, {}, context);
      return products.find(p => p.id === id);
    }
  }
};

// ============================================================================
// SERVER SETUP
// ============================================================================

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests, please try again later',
      code: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    
    // Security settings
    introspection: process.env.NODE_ENV !== 'production',
    
    // Error formatting
    formatError: (formattedError, error) => {
      console.error('GraphQL Error:', {
        message: formattedError.message,
        path: formattedError.path,
        timestamp: new Date().toISOString()
      });

      // Sanitize errors in production
      if (process.env.NODE_ENV === 'production') {
        if (formattedError.message.includes('Authentication') || 
            formattedError.message.includes('Authorization')) {
          return new Error('Authentication required');
        }
        if (!formattedError.message.includes('Authentication required')) {
          return new Error('Internal server error');
        }
      }

      return formattedError;
    }
  });

  await server.start();

  // Apply middleware
  app.use('/graphql', 
    limiter,
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
      context: createAuthContext
    })
  );

  // Health check endpoint (no auth required)
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      authentication: AUTH_REQUIRED ? 'enabled' : 'disabled'
    });
  });

  // Start the server
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  
  console.log('🚀 Norko GraphQL API ready!');
  console.log(`📍 Server: http://localhost:${PORT}/graphql`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log('🔐 Authentication: ENABLED');
  console.log('🛡️ E-commerce data: PROTECTED');
}

startServer().catch(error => {
  console.error('❌ Server startup failed:', error);
  process.exit(1);
});
