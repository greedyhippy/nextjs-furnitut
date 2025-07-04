/**
 * Railway Integration Test Page
 * 
 * Test page to verify Railway API connectivity and data
 */

import { railwayApi } from '@/lib/railway-api';

async function RailwayStatusCheck() {
  try {
    const isHealthy = await railwayApi.healthCheck();
    
    if (!isHealthy) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">❌ Railway API Unavailable</h3>
          <p className="text-red-700 text-sm">
            Cannot connect to Railway GraphQL API. Please check your configuration.
          </p>
        </div>
      );
    }

    // Try to fetch some products
    const { products } = await railwayApi.getProducts({ limit: 3 });
    
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-green-800 font-semibold mb-2">✅ Railway API Connected</h3>
          <p className="text-green-700 text-sm">
            Successfully connected to Railway GraphQL API
          </p>
        </div>

        {products && products.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-blue-800 font-semibold mb-4">📦 Sample Products Found</h3>
            <div className="space-y-3">
              {products.slice(0, 3).map((product: any) => (
                <div key={product.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sku}</p>
                      {product.category && (
                        <span className="text-xs text-blue-600 font-medium">
                          {product.category.name}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {product.pricing && (
                        <div className="text-lg font-semibold text-gray-900">
                          ${product.pricing.basePrice}
                        </div>
                      )}
                      {product.inventory && (
                        <div className="text-xs text-gray-500">
                          {product.inventory.status}
                        </div>
                      )}
                    </div>
                  </div>
                  {product.images && product.images.length > 0 && (
                    <div className="mt-3 text-xs text-gray-500">
                      📸 {product.images.length} image(s) available
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
    
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">⚠️ Railway API Error</h3>
        <p className="text-red-700 text-sm mb-3">
          Error connecting to Railway API:
        </p>
        <pre className="text-xs text-red-600 bg-red-100 p-2 rounded overflow-x-auto">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    );
  }
}

export default async function RailwayTestPage() {
  const railwayEndpoint = process.env.RAILWAY_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT;
  const hasRailwayToken = !!process.env.RAILWAY_API_TOKEN;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Railway API Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Testing connectivity to your Railway GraphQL API
          </p>
        </div>

        {/* Configuration Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Railway Endpoint:</span>
              <span className={`text-sm ${railwayEndpoint ? 'text-green-600' : 'text-red-600'}`}>
                {railwayEndpoint ? '✅ Configured' : '❌ Not Set'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">API Token:</span>
              <span className={`text-sm ${hasRailwayToken ? 'text-green-600' : 'text-red-600'}`}>
                {hasRailwayToken ? '✅ Present' : '❌ Missing'}
              </span>
            </div>
            {railwayEndpoint && (
              <div className="text-xs text-gray-500 mt-2">
                Endpoint: <code className="bg-gray-100 px-1 rounded">{railwayEndpoint}</code>
              </div>
            )}
          </div>
        </div>

        {/* API Test Results */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Connection Test</h2>
          <RailwayStatusCheck />
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-medium">1.</span>
              <span>Configure your Railway GraphQL endpoint in <code className="bg-gray-100 px-1 rounded">.env.local</code></span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-medium">2.</span>
              <span>Add your Railway API token for authentication</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-medium">3.</span>
              <span>Test the connection and view your product data</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-medium">4.</span>
              <span>Visit <code className="bg-gray-100 px-1 rounded">/products</code> to see your products in the beautiful UI</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <a 
            href="/products" 
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            View Products Page
          </a>
          <a 
            href="/modern-preview" 
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Modern Design
          </a>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Railway API Test | Norko',
  description: 'Test Railway GraphQL API integration',
};
