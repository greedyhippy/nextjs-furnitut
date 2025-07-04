/**
 * Security Assessment Tool for Norko GraphQL API
 * Tests current security posture and provides recommendations
 */

const endpoint = 'https://norko-graphql-api-production.up.railway.app/graphql';

// Test queries that reveal sensitive information
const SENSITIVE_QUERIES = {
  inventory: `
    query GetInventory {
      products {
        id
        name
        inventory
        stockLevel
        lowStockThreshold
      }
    }
  `,
  pricing: `
    query GetPricing {
      products {
        id
        name
        price
        cost
        markup
        wholesalePrice
      }
    }
  `,
  unreleased: `
    query GetUnreleasedProducts {
      products(filter: { status: DRAFT }) {
        id
        name
        launchDate
        status
      }
    }
  `,
  analytics: `
    query GetAnalytics {
      productAnalytics {
        salesCount
        revenue
        profitMargin
      }
    }
  `
};

async function testEndpointSecurity() {
  console.log('🔍 SECURITY ASSESSMENT: Norko GraphQL API');
  console.log('📍 Endpoint:', endpoint);
  console.log('=' .repeat(60));

  let vulnerabilities = [];
  let recommendations = [];

  // Test 1: Public accessibility
  console.log('\n🌐 Test 1: Public Accessibility');
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query { __schema { queryType { name } } }`
      })
    });

    if (response.ok) {
      const result = await response.json();
      if (!result.errors) {
        console.log('❌ VULNERABILITY: API is publicly accessible');
        vulnerabilities.push('Public API access without authentication');
        recommendations.push('Implement authentication middleware');
      }
    } else {
      console.log('✅ API requires authentication (good!)');
    }
  } catch (error) {
    console.log('🔍 Connection test:', error.message);
  }

  // Test 2: Introspection exposure
  console.log('\n🔍 Test 2: Schema Introspection');
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
                fields {
                  name
                  type {
                    name
                  }
                }
              }
            }
          }
        `
      })
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data?.__schema) {
        console.log('❌ VULNERABILITY: Full schema introspection enabled');
        vulnerabilities.push('Schema introspection exposes API structure');
        recommendations.push('Disable introspection in production');
      }
    }
  } catch (error) {
    console.log('✅ Introspection likely disabled');
  }

  // Test 3: Sensitive data exposure
  console.log('\n💰 Test 3: Sensitive Data Exposure');
  for (const [testName, query] of Object.entries(SENSITIVE_QUERIES)) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && !result.errors) {
          console.log(`❌ VULNERABILITY: ${testName} data publicly accessible`);
          vulnerabilities.push(`Sensitive ${testName} data exposed`);
        }
      }
    } catch (error) {
      // Expected if API is secured
    }
  }

  // Test 4: Rate limiting
  console.log('\n⚡ Test 4: Rate Limiting');
  try {
    const promises = Array.from({ length: 10 }, () =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { __typename }`
        })
      })
    );

    const responses = await Promise.all(promises);
    const rateLimited = responses.some(r => r.status === 429);

    if (!rateLimited) {
      console.log('⚠️ WARNING: No rate limiting detected');
      vulnerabilities.push('No rate limiting protection');
      recommendations.push('Implement rate limiting to prevent abuse');
    } else {
      console.log('✅ Rate limiting appears to be active');
    }
  } catch (error) {
    console.log('🔍 Rate limit test inconclusive');
  }

  // Security Report
  console.log('\n' + '=' .repeat(60));
  console.log('📊 SECURITY ASSESSMENT RESULTS');
  console.log('=' .repeat(60));

  if (vulnerabilities.length === 0) {
    console.log('🎉 EXCELLENT: No obvious vulnerabilities detected!');
    console.log('✅ Your API appears to be properly secured');
  } else {
    console.log(`🚨 VULNERABILITIES FOUND: ${vulnerabilities.length}`);
    vulnerabilities.forEach((vuln, index) => {
      console.log(`${index + 1}. ${vuln}`);
    });
  }

  if (recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }

  // Security Score
  const maxScore = 10;
  const score = Math.max(0, maxScore - vulnerabilities.length * 2);
  console.log(`\n🏆 SECURITY SCORE: ${score}/${maxScore}`);

  if (score >= 8) {
    console.log('✅ GOOD: Your API security is solid');
  } else if (score >= 6) {
    console.log('⚠️ MODERATE: Some security improvements needed');
  } else {
    console.log('🚨 CRITICAL: Immediate security attention required');
  }

  console.log('\n📚 Next Steps:');
  console.log('1. Review the SECURITY-IMPLEMENTATION.md guide');
  console.log('2. Implement authentication if not already done');
  console.log('3. Run this test again after security changes');
  console.log('4. Consider additional protections like CORS, HTTPS enforcement');
}

testEndpointSecurity();
