/**
 * Railway GraphQL Client Configuration
 * 
 * This client handles all communication with the Railway-hosted GraphQL API
 * for product data, inventory, pricing, and specifications.
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Railway API Configuration
const RAILWAY_ENDPOINT = process.env.RAILWAY_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT;
const RAILWAY_TOKEN = process.env.RAILWAY_API_TOKEN;

if (!RAILWAY_ENDPOINT) {
  console.warn('Railway GraphQL endpoint not configured. Some features may not work.');
}

// HTTP Link for Railway API
const httpLink = createHttpLink({
  uri: RAILWAY_ENDPOINT,
});

// Authentication Link
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: RAILWAY_TOKEN ? `Bearer ${RAILWAY_TOKEN}` : '',
      'Content-Type': 'application/json',
    }
  };
});

// Error Link for handling Railway API errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[Railway GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Railway Network error]: ${networkError}`);
    
    // Handle specific network errors
    if (networkError.statusCode === 401) {
      console.error('Railway API authentication failed. Check your API token.');
    }
  }
});

// Apollo Client for Railway API
export const railwayClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['sku'], // Use SKU as unique identifier for Railway products
      },
      Inventory: {
        keyFields: ['productSku'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Helper function to check if Railway client is configured
export const isRailwayConfigured = (): boolean => {
  return !!(RAILWAY_ENDPOINT && RAILWAY_TOKEN);
};

// Railway API Health Check
export const checkRailwayHealth = async (): Promise<boolean> => {
  if (!isRailwayConfigured()) {
    return false;
  }

  try {
    // Simple introspection query to check if API is accessible
    const result = await railwayClient.query({
      query: require('graphql-tag')`
        query HealthCheck {
          __typename
        }
      `,
      fetchPolicy: 'network-only',
    });
    
    return !!result.data;
  } catch (error) {
    console.error('Railway API health check failed:', error);
    return false;
  }
};

export default railwayClient;
