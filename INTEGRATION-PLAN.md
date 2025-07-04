# Norko Integration Plan: Crystallize + Railway GraphQL API

## 🎯 **Objective**

Integrate the Crystallize retail e-commerce boilerplate pattern with Railway-hosted GraphQL API to create a hybrid content + product data system for Norko infrared heaters.

## 🏗️ **Architecture Overview**

### **Dual-Source Data Strategy**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Crystallize   │    │   Next.js App    │    │  Railway API    │
│                 │    │                  │    │                 │
│ • Content       │◄──►│ • Data Layer     │◄──►│ • Products      │
│ • Images        │    │ • API Routes     │    │ • Inventory     │
│ • Categories    │    │ • Components     │    │ • Pricing       │
│ • Stories       │    │ • State Mgmt     │    │ • Variants      │
│ • Marketing     │    │                  │    │ • Specs         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Data Responsibility Split**

#### **Crystallize (Content Management)**

- Product descriptions and marketing content
- Hero images and product galleries
- Category structures and navigation
- Brand stories and company content
- SEO metadata and rich content
- Grid layouts and page compositions

#### **Railway GraphQL API (Product Data)**

- Real-time inventory levels
- Product pricing and variants
- Technical specifications
- Stock management
- Order processing data
- Product availability

## 🚀 **Implementation Phases**

### **Phase 1: Foundation Setup (Current)**

- [x] Set up Next.js project with Crystallize integration
- [x] Configure development environment
- [x] Create placeholder GraphQL types
- [ ] **NEXT**: Integrate Railway GraphQL client
- [ ] Create unified data layer

### **Phase 2: Content Model Design**

- [ ] Design Crystallize shapes for infrared heaters
- [ ] Create category structure (Indoor/Outdoor/Commercial)
- [ ] Set up product content templates
- [ ] Configure image and media management

### **Phase 3: API Integration Layer**

- [ ] Create Railway GraphQL client
- [ ] Build data aggregation layer
- [ ] Implement caching strategy
- [ ] Create unified product interface

### **Phase 4: E-commerce Features**

- [ ] Shopping cart with Railway inventory sync
- [ ] Real-time stock updates
- [ ] Dynamic pricing from Railway
- [ ] Order processing workflow

### **Phase 5: Advanced Features**

- [ ] Product filtering and search
- [ ] Inventory management dashboard
- [ ] Analytics and reporting
- [ ] Performance optimization

## 🔧 **Technical Implementation**

### **1. Data Layer Architecture**

```typescript
// Core interfaces for unified data
interface NorkoProduct {
    // From Crystallize
    id: string;
    contentId: string;
    name: string;
    description: string;
    images: ProductImage[];
    category: Category;
    seo: SEOData;

    // From Railway API
    sku: string;
    variants: ProductVariant[];
    inventory: InventoryData;
    pricing: PricingData;
    specifications: TechnicalSpecs;
}

interface DataLayer {
    // Crystallize methods
    fetchProductContent(id: string): Promise<ProductContent>;
    fetchCategories(): Promise<Category[]>;

    // Railway API methods
    fetchProductData(sku: string): Promise<ProductData>;
    updateInventory(sku: string, quantity: number): Promise<void>;

    // Unified methods
    getProduct(id: string): Promise<NorkoProduct>;
    searchProducts(query: string): Promise<NorkoProduct[]>;
}
```

### **2. API Routes Structure**

```
/api/
├── crystallize/          # Crystallize integration
│   ├── products/         # Product content
│   ├── categories/       # Category navigation
│   └── content/          # General content
├── railway/              # Railway API integration
│   ├── inventory/        # Stock management
│   ├── pricing/          # Product pricing
│   └── sync/             # Data synchronization
└── unified/              # Combined data endpoints
    ├── products/         # Merged product data
    ├── search/           # Unified search
    └── cart/             # Cart with real-time data
```

### **3. Component Architecture**

Based on retail boilerplate patterns:

```
components/
├── product/              # Product display components
│   ├── ProductGrid/      # Grid layouts from Crystallize
│   ├── ProductCard/      # Individual product cards
│   ├── ProductDetails/   # Detailed product view
│   └── ProductFilters/   # Search and filtering
├── cart/                 # Shopping cart
│   ├── CartProvider/     # State management
│   ├── CartItem/         # Individual items
│   └── CartSummary/      # Order summary
├── inventory/            # Stock management
│   ├── StockIndicator/   # Real-time stock display
│   ├── StockAlert/       # Low stock notifications
│   └── InventorySync/    # Background sync component
└── crystallize/          # Crystallize-specific components
    ├── Grid/             # Grid organizer components
    ├── RichContent/      # Rich text and media
    └── Navigation/       # Category navigation
```

## 📋 **Next Immediate Steps**

### **Step 1: Railway API Integration (This Week)**

1. **Set up Railway GraphQL client**

    ```bash
    npm install @apollo/client graphql
    ```

2. **Create Railway API configuration**

    ```typescript
    // lib/railway-client.ts
    import { ApolloClient, InMemoryCache } from '@apollo/client';

    export const railwayClient = new ApolloClient({
        uri: process.env.RAILWAY_GRAPHQL_ENDPOINT,
        headers: {
            authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
        },
        cache: new InMemoryCache(),
    });
    ```

3. **Create unified data layer**
    ```typescript
    // lib/data-layer.ts
    export class NorkoDataLayer {
        async getProduct(id: string): Promise<NorkoProduct> {
            // Fetch from both Crystallize and Railway
            // Merge and return unified product
        }
    }
    ```

### **Step 2: Content Model Setup (Next Week)**

1. **Design product shapes in Crystallize**

    - Create "Infrared Heater" product shape
    - Configure components (images, descriptions, features)
    - Set up variant handling

2. **Set up categories**
    - Indoor Heaters
    - Outdoor Heaters
    - Commercial Systems
    - Accessories

### **Step 3: Implement Core Features (Following Weeks)**

1. **Product display with unified data**
2. **Shopping cart with Railway inventory**
3. **Real-time stock updates**
4. **Search and filtering**

## 🔄 **Data Synchronization Strategy**

### **Real-time Updates**

- Use Railway webhooks for inventory changes
- Implement WebSocket connections for live updates
- Cache Crystallize content with TTL
- Background sync for product data

### **Caching Strategy**

```typescript
// Multi-layer caching
interface CacheStrategy {
    crystallize: {
        content: '1 hour'; // Content changes infrequently
        images: '24 hours'; // Images rarely change
    };
    railway: {
        inventory: '5 minutes'; // Stock changes frequently
        pricing: '30 minutes'; // Prices change occasionally
    };
}
```

## 🎯 **Success Metrics**

### **Performance Goals**

- Page load time < 2 seconds
- Inventory sync < 500ms
- Search results < 1 second
- 99.9% uptime

### **User Experience Goals**

- Real-time stock visibility
- Accurate pricing display
- Fast product search
- Seamless cart experience

## 🚀 **Ready to Start?**

The next immediate action is to:

1. **Set up Railway GraphQL client integration**
2. **Create the unified data layer foundation**
3. **Design the first Crystallize content models**

This hybrid approach will give you the best of both worlds - Crystallize's powerful content management with Railway's flexible product data API!
