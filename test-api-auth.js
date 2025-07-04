/**
 * Simple test to check if your GraphQL API requires authentication
 */

const endpoint = 'https://norko-graphql-api-production.up.railway.app/graphql';

// Test 1: Basic connectivity without auth
async function testWithoutAuth() {
  console.log('🧪 Testing WITHOUT authentication...');
  
  const query = `
    query {
      __schema {
        queryType {
          name
        }
      }
    }
  `;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    console.log('Status:', response.status);
    const result = await response.json();
    
    if (response.ok && !result.errors) {
      console.log('✅ SUCCESS: Your API does NOT require authentication!');
      console.log('Schema accessible:', result.data?.__schema?.queryType?.name);
      return true;
    } else {
      console.log('❌ Failed without auth:', result.errors || response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
}

// Test 2: With Bearer token
async function testWithAuth() {
  console.log('\n🔐 Testing WITH Bearer token...');
  
  const token = 'fec4f4e5-4236-45c3-99d9-559efd358a86';
  
  const query = `
    query {
      __schema {
        queryType {
          name
        }
      }
    }
  `;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });
    
    console.log('Status:', response.status);
    const result = await response.json();
    
    if (response.ok && !result.errors) {
      console.log('✅ SUCCESS: Bearer token authentication works!');
      console.log('Schema accessible:', result.data?.__schema?.queryType?.name);
      return true;
    } else {
      console.log('❌ Failed with Bearer token:', result.errors || response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
}

// Test 3: Try to get actual products
async function testProductsQuery() {
  console.log('\n📦 Testing products query...');
  
  const query = `
    query {
      products {
        id
        name
        sku
        price
      }
    }
  `;
  
  // Try without auth first
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    const result = await response.json();
    
    if (response.ok && !result.errors) {
      console.log('✅ Products query works without auth!');
      console.log('Products found:', result.data?.products?.length || 0);
      if (result.data?.products?.length > 0) {
        console.log('Sample product:', result.data.products[0]);
      }
      return true;
    } else {
      console.log('❌ Products query failed:', result.errors?.[0]?.message || response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Products query error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Testing Norko GraphQL API...');
  console.log('📍 Endpoint:', endpoint);
  console.log('=' .repeat(60));
  
  const withoutAuth = await testWithoutAuth();
  const withAuth = await testWithAuth();
  const productsWork = await testProductsQuery();
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RESULTS:');
  console.log('Without Auth:', withoutAuth ? '✅ Works' : '❌ Failed');
  console.log('With Bearer Token:', withAuth ? '✅ Works' : '❌ Failed');
  console.log('Products Query:', productsWork ? '✅ Works' : '❌ Failed');
  
  if (withoutAuth || productsWork) {
    console.log('\n🎉 GOOD NEWS: Your API appears to be publicly accessible!');
    console.log('You may not need authentication for this demo.');
  } else if (withAuth) {
    console.log('\n🔐 Your API requires Bearer token authentication.');
  } else {
    console.log('\n🤔 Your API may use a different authentication method.');
    console.log('Check your GraphQL API documentation or source code.');
  }
}

runTests();
