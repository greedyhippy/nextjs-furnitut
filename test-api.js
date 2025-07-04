const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

console.log('Environment Variables:');
console.log('CRYSTALLIZE_TENANT_IDENTIFIER:', process.env.CRYSTALLIZE_TENANT_IDENTIFIER);
console.log('CRYSTALLIZE_ACCESS_TOKEN_ID:', process.env.CRYSTALLIZE_ACCESS_TOKEN_ID);
console.log('CRYSTALLIZE_ACCESS_TOKEN_SECRET:', process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET ? '***' : 'undefined');

const DISCOVERY_API_ENDPOINT = `https://api.crystallize.com/${process.env.CRYSTALLIZE_TENANT_IDENTIFIER}/discovery`;
console.log('Discovery API Endpoint:', DISCOVERY_API_ENDPOINT);

// Test discovery API connection
async function testDiscoveryAPI() {
    try {
        const response = await fetch(DISCOVERY_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        __schema {
                            types {
                                name
                            }
                        }
                    }
                `
            })
        });

        if (!response.ok) {
            console.error('HTTP Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response body:', text);
            return;
        }

        const result = await response.json();
        console.log('Discovery API response:', JSON.stringify(result, null, 2));
        console.log('Schema types found:', result.data?.__schema?.types?.length || 0);
    } catch (error) {
        console.error('Discovery API test failed:', error);
    }
}

testDiscoveryAPI();
