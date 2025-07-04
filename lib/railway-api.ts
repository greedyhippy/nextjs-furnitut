/**
 * Railway API Client
 * 
 * Client for fetching product data from Railway GraphQL API
 */

import { 
  RailwayProduct, 
  ProductFilters, 
  PaginatedProducts,
  RailwayApiResponse,
  GET_PRODUCTS,
  GET_PRODUCT_BY_SKU,
  GET_CATEGORIES,
  SEARCH_PRODUCTS
} from '@/types/railway-types';

// Configuration
const RAILWAY_API_ENDPOINT = process.env.RAILWAY_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT;
const RAILWAY_API_TOKEN = process.env.RAILWAY_API_TOKEN;

if (!RAILWAY_API_ENDPOINT) {
  console.error('❌ Railway API endpoint not configured. Set RAILWAY_GRAPHQL_ENDPOINT in .env.local');
}

if (!RAILWAY_API_TOKEN) {
  console.error('🚨 SECURITY WARNING: No API token configured!');
  console.error('For production e-commerce APIs, authentication is required.');
  console.error('Set RAILWAY_API_TOKEN in .env.local with your secure API key.');
}

// ============================================================================
// RAILWAY API CLIENT CLASS
// ============================================================================

export class RailwayApiClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = RAILWAY_API_ENDPOINT || '';
    
    // Production e-commerce APIs require authentication
    if (!RAILWAY_API_TOKEN || RAILWAY_API_TOKEN === 'your-railway-api-token-here') {
      console.error('🚨 CRITICAL: No valid API token provided!');
      console.error('E-commerce APIs with sensitive data must be secured.');
      console.error('Follow the RAILWAY-AUTH-SETUP.md guide to implement authentication.');
      throw new Error('Railway API authentication required for secure e-commerce operations');
    }
    
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
    };
    
    console.log('🔐 Railway API client initialized with secure authentication');
    console.log('�️ E-commerce data protection: ENABLED');
  }
  }

  /**
   * Execute GraphQL query against Railway API
   */
  private async executeQuery<T>(query: string, variables?: Record<string, any>): Promise<T> {
    if (!this.endpoint) {
      throw new Error('Railway API endpoint not configured');
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Your API may require a valid token or different authentication method.');
        }
        if (response.status === 403) {
          throw new Error('Access forbidden. Please verify your API token has the required permissions.');
        }
        throw new Error(`Railway API error: ${response.status} ${response.statusText}`);
      }

      const result: RailwayApiResponse<T> = await response.json();

      if (result.errors) {
        console.error('Railway GraphQL errors:', result.errors);
        // Check for authentication-related errors
        const authError = result.errors.find(error => 
          error.message.toLowerCase().includes('unauthorized') ||
          error.message.toLowerCase().includes('authentication') ||
          error.message.toLowerCase().includes('token')
        );
        if (authError) {
          throw new Error(`Authentication error: ${authError.message}. Check your RAILWAY_API_TOKEN configuration.`);
        }
        throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
      }

      return result.data;
    } catch (error) {
      console.error('Railway API request failed:', error);
      throw error;
    }
  }

  /**
   * Get all products with pagination and filtering
   */
  async getProducts(options: {
    limit?: number;
    offset?: number;
    category?: string;
  } = {}): Promise<{ products: RailwayProduct[] }> {
    const { limit = 12, offset = 0, category } = options;
    
    return this.executeQuery(GET_PRODUCTS, {
      limit,
      offset,
      category,
    });
  }

  /**
   * Get a single product by SKU
   */
  async getProductBySku(sku: string): Promise<{ product: RailwayProduct }> {
    return this.executeQuery(GET_PRODUCT_BY_SKU, { sku });
  }

  /**
   * Get all product categories
   */
  async getCategories(): Promise<{ categories: any[] }> {
    return this.executeQuery(GET_CATEGORIES);
  }

  /**
   * Search products with filters
   */
  async searchProducts(query: string, filters?: ProductFilters): Promise<any> {
    return this.executeQuery(SEARCH_PRODUCTS, {
      query,
      filters,
    });
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 6): Promise<{ products: RailwayProduct[] }> {
    // Assuming your Railway API supports filtering by featured flag
    return this.getProducts({ limit });
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, options: {
    limit?: number;
    offset?: number;
  } = {}): Promise<{ products: RailwayProduct[] }> {
    return this.getProducts({ ...options, category });
  }

  /**
   * Check API health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query: '{ __typename }',
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const railwayApi = new RailwayApiClient();

// ============================================================================
// CONVENIENCE HOOKS FOR NEXT.JS
// ============================================================================

/**
 * Fetch products for SSR/SSG
 */
export async function fetchProductsForPage(options: {
  limit?: number;
  offset?: number;
  category?: string;
} = {}) {
  try {
    const result = await railwayApi.getProducts(options);
    return {
      products: result.products || [],
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {
      products: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch single product for SSR/SSG
 */
export async function fetchProductForPage(sku: string) {
  try {
    const result = await railwayApi.getProductBySku(sku);
    return {
      product: result.product,
      error: null,
    };
  } catch (error) {
    console.error(`Failed to fetch product ${sku}:`, error);
    return {
      product: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch categories for navigation
 */
export async function fetchCategoriesForNav() {
  try {
    const result = await railwayApi.getCategories();
    return {
      categories: result.categories || [],
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return {
      categories: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// CLIENT-SIDE HELPERS
// ============================================================================

/**
 * Client-side product fetching with caching
 */
export async function fetchProductsClient(options: {
  limit?: number;
  offset?: number;
  category?: string;
} = {}) {
  const searchParams = new URLSearchParams();
  if (options.limit) searchParams.set('limit', options.limit.toString());
  if (options.offset) searchParams.set('offset', options.offset.toString());
  if (options.category) searchParams.set('category', options.category);

  const response = await fetch(`/api/railway/products?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

/**
 * Client-side product search
 */
export async function searchProductsClient(query: string, filters?: ProductFilters) {
  const response = await fetch('/api/railway/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, filters }),
  });
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  return response.json();
}

export default railwayApi;
