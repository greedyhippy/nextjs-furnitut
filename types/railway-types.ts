/**
 * Railway GraphQL Types and Queries
 * 
 * TypeScript definitions for Norko product data from Railway API
 */

// ============================================================================
// RAILWAY PRODUCT TYPES
// ============================================================================

export interface RailwayProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: TechnicalSpecs;
  pricing: ProductPricing;
  inventory: InventoryData;
  metadata: ProductMetadata;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'hero' | 'gallery' | 'lifestyle' | 'technical' | 'installation';
  width: number;
  height: number;
  priority?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  attributes: {
    color?: string;
    size?: string;
    power?: string;
    mounting?: string;
  };
  pricing: ProductPricing;
  inventory: InventoryData;
  images: ProductImage[];
}

export interface TechnicalSpecs {
  power: string;           // "2000W"
  coverage: string;        // "40m²"
  weight: string;          // "12kg"
  dimensions: string;      // "120 x 30 x 8 cm"
  voltage: string;         // "230V"
  efficiency: string;      // "99%"
  mounting: string[];      // ["Wall", "Ceiling", "Portable"]
  controls: string[];      // ["Remote", "App", "Thermostat"]
  certifications: string[]; // ["CE", "IP65", "Energy A+++"]
}

export interface ProductPricing {
  basePrice: number;
  salePrice?: number;
  currency: string;
  taxIncluded: boolean;
  priceRules?: PriceRule[];
}

export interface PriceRule {
  type: 'volume' | 'seasonal' | 'promotion';
  condition: string;
  discount: number;
  validFrom: string;
  validTo: string;
}

export interface InventoryData {
  stock: number;
  reserved: number;
  available: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  restockDate?: string;
  location: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  path: string[];         // ["heating", "indoor", "premium"]
  description: string;
}

export interface ProductMetadata {
  brand: string;
  model: string;
  series: string;
  launchDate: string;
  featured: boolean;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

// ============================================================================
// RAILWAY GRAPHQL QUERIES
// ============================================================================

export const GET_PRODUCTS = `
  query GetProducts($limit: Int, $offset: Int, $category: String) {
    products(limit: $limit, offset: $offset, category: $category) {
      id
      sku
      name
      description
      category {
        id
        name
        slug
        path
      }
      images {
        id
        url
        alt
        type
        width
        height
        priority
      }
      variants {
        id
        sku
        name
        attributes {
          color
          size
          power
          mounting
        }
        pricing {
          basePrice
          salePrice
          currency
          taxIncluded
        }
        inventory {
          stock
          available
          status
        }
      }
      specifications {
        power
        coverage
        weight
        dimensions
        voltage
        efficiency
        mounting
        controls
        certifications
      }
      pricing {
        basePrice
        salePrice
        currency
        taxIncluded
      }
      inventory {
        stock
        available
        status
        restockDate
      }
      metadata {
        brand
        model
        series
        featured
        tags
        seoTitle
        seoDescription
      }
    }
  }
`;

export const GET_PRODUCT_BY_SKU = `
  query GetProductBySku($sku: String!) {
    product(sku: $sku) {
      id
      sku
      name
      description
      category {
        id
        name
        slug
        path
      }
      images {
        id
        url
        alt
        type
        width
        height
        priority
      }
      variants {
        id
        sku
        name
        attributes {
          color
          size
          power
          mounting
        }
        pricing {
          basePrice
          salePrice
          currency
          taxIncluded
        }
        inventory {
          stock
          available
          status
        }
        images {
          id
          url
          alt
          type
          width
          height
        }
      }
      specifications {
        power
        coverage
        weight
        dimensions
        voltage
        efficiency
        mounting
        controls
        certifications
      }
      pricing {
        basePrice
        salePrice
        currency
        taxIncluded
        priceRules {
          type
          condition
          discount
          validFrom
          validTo
        }
      }
      inventory {
        stock
        reserved
        available
        status
        restockDate
        location
      }
      metadata {
        brand
        model
        series
        launchDate
        featured
        tags
        seoTitle
        seoDescription
      }
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      id
      name
      slug
      parent
      path
      description
      productCount
    }
  }
`;

export const SEARCH_PRODUCTS = `
  query SearchProducts($query: String!, $filters: ProductFilters) {
    searchProducts(query: $query, filters: $filters) {
      products {
        id
        sku
        name
        description
        images {
          url
          alt
          type
        }
        pricing {
          basePrice
          salePrice
          currency
        }
        inventory {
          status
        }
        metadata {
          featured
          tags
        }
      }
      facets {
        category {
          name
          count
        }
        priceRange {
          min
          max
        }
        attributes {
          power
          mounting
          controls
        }
      }
      totalCount
    }
  }
`;

export const UPDATE_INVENTORY = `
  mutation UpdateInventory($sku: String!, $quantity: Int!) {
    updateInventory(sku: $sku, quantity: $quantity) {
      success
      product {
        sku
        inventory {
          stock
          available
          status
        }
      }
    }
  }
`;

// ============================================================================
// RAILWAY API CLIENT HELPERS
// ============================================================================

export interface RailwayApiResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    path: string[];
  }>;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  power?: string[];
  mounting?: string[];
  inStock?: boolean;
  featured?: boolean;
}

export interface PaginatedProducts {
  products: RailwayProduct[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Helper types for components
export interface ProductCardProps {
  product: RailwayProduct;
  variant?: ProductVariant;
  showQuickView?: boolean;
  showAddToCart?: boolean;
}

export interface ProductGridProps {
  products: RailwayProduct[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  showPagination?: boolean;
}
