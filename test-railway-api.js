/**
 * Secure Norko GraphQL API Test
 * Tests authenticated connection to your custom GraphQL API hosted on Railway
 */

const endpoint = 'https://norko-graphql-api-production.up.railway.app/graphql';

// You need to provide your API token here for testing
const API_TOKEN = process.env.RAILWAY_API_TOKEN || 'your-token-here';

if (!API_TOKEN || API_TOKEN === 'your-token-here') {
  console.error('❌ RAILWAY_API_TOKEN is required for secure testing');
  console.log('This should be the authentication token for YOUR GraphQL API');
  console.log('Check your norko-graphql-api service Variables in Railway dashboard');
  process.exit(1);
}

// Simple introspection query to test connectivity
const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      types {
        name
        kind
      }
    }
  }
`;

// Test products query
const productsQuery = `
  query GetProducts {
    products {
      id
      name
      sku
      price
      category
    }
  }
`;

async function testRailwayAPI() {
  console.log('🔐 Testing Secure Railway GraphQL API...');
  console.log('📍 Endpoint:', endpoint);
  console.log('🔑 Using Authentication: Bearer Token');
  
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  };
  
  try {
    // Test 1: Schema introspection with auth
    console.log('\n🔍 Test 1: Authenticated API Introspection');
    const introspectionResponse = await fetch(endpoint, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        query: introspectionQuery
      })
    });
    
    console.log('Status:', introspectionResponse.status);
    const introspectionResult = await introspectionResponse.json();
    
    if (introspectionResponse.status === 401) {
      console.log('❌ Authentication failed - check your API token');
      return;
    }
    
    if (introspectionResult.errors) {
      console.log('❌ Errors:', introspectionResult.errors);
    } else {
      console.log('✅ Authenticated access successful!');
      console.log('Query Type:', introspectionResult.data?.__schema?.queryType?.name);
    }
    
    // Test 2: Secure products query
    console.log('\n📦 Test 2: Authenticated Products Query');
    const productsResponse = await fetch(endpoint, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        query: productsQuery
      })
    });
    
    console.log('Status:', productsResponse.status);
    const productsResult = await productsResponse.json();
    
    if (productsResponse.status === 401) {
      console.log('❌ Authentication failed for products query');
      return;
    }
    
    if (productsResult.errors) {
      console.log('❌ Errors:', productsResult.errors);
    } else {
      console.log('✅ Secure products query successful!');
      console.log('Products found:', productsResult.data?.products?.length || 0);
      if (productsResult.data?.products?.length > 0) {
        console.log('Sample product:', productsResult.data.products[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testRailwayAPI();
