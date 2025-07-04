/**
 * Quick Railway Connection Test
 * 
 * Run this script to test your Railway GraphQL connection
 */

// Test script - save as test-railway.js and run with: node test-railway.js

const RAILWAY_ENDPOINT = 'https://your-app.railway.app/graphql'; // Replace with your endpoint
const RAILWAY_TOKEN = 'your-token-here'; // Replace with your token (if needed)

async function testRailwayConnection() {
  console.log('🧪 Testing Railway GraphQL Connection...\n');
  
  // Test 1: Basic connectivity
  console.log('1. Testing basic connectivity...');
  try {
    const response = await fetch(RAILWAY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(RAILWAY_TOKEN && { 'Authorization': `Bearer ${RAILWAY_TOKEN}` }),
      },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    });
    
    if (response.ok) {
      console.log('✅ Connection successful!');
    } else {
      console.log(`❌ Connection failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Connection error: ${error.message}`);
  }
  
  // Test 2: Schema introspection
  console.log('\n2. Testing schema introspection...');
  try {
    const response = await fetch(RAILWAY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(RAILWAY_TOKEN && { 'Authorization': `Bearer ${RAILWAY_TOKEN}` }),
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
                kind
              }
            }
          }
        `
      })
    });
    
    const result = await response.json();
    if (result.data) {
      console.log('✅ Schema accessible!');
      console.log(`📊 Found ${result.data.__schema.types.length} types in schema`);
    } else {
      console.log('❌ Schema not accessible');
      console.log('Response:', result);
    }
  } catch (error) {
    console.log(`❌ Schema error: ${error.message}`);
  }
  
  // Test 3: Products query (if available)
  console.log('\n3. Testing products query...');
  try {
    const response = await fetch(RAILWAY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(RAILWAY_TOKEN && { 'Authorization': `Bearer ${RAILWAY_TOKEN}` }),
      },
      body: JSON.stringify({
        query: `
          query TestProducts {
            products(limit: 1) {
              id
              name
              sku
            }
          }
        `
      })
    });
    
    const result = await response.json();
    if (result.data && result.data.products) {
      console.log('✅ Products query successful!');
      console.log('Sample product:', result.data.products[0]);
    } else {
      console.log('❌ Products query failed');
      console.log('Response:', result);
    }
  } catch (error) {
    console.log(`❌ Products query error: ${error.message}`);
  }
  
  console.log('\n🎯 Configuration for .env.local:');
  console.log(`RAILWAY_GRAPHQL_ENDPOINT=${RAILWAY_ENDPOINT}`);
  if (RAILWAY_TOKEN) {
    console.log(`RAILWAY_API_TOKEN=${RAILWAY_TOKEN}`);
  }
}

testRailwayConnection();
