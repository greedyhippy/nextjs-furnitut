# 🚂 Railway API Integration Setup

## Current Status: Railway First Implementation

We're building the **Railway integration first** to leverage your existing product images and data for immediate visual impact.

## ✅ What's Been Built

### 🔧 Core Infrastructure
- **Railway TypeScript Types** (`/types/railway-types.ts`)
- **Railway API Client** (`/lib/railway-api.ts`)
- **Next.js API Routes** (`/api/railway/products/`)
- **Professional Product Cards** (`/components/product/product-card.tsx`)
- **Products Page** (`/app/products/page.tsx`)
- **Integration Test Page** (`/app/railway-test/page.tsx`)

### 🎨 UI Components Ready
- **FRNTR-style product cards** with hover effects
- **Professional grid layouts** with loading states
- **Real product data integration** (images, pricing, inventory)
- **Responsive design** for all devices
- **Advanced filtering and search** (ready for your API)

## 🔧 Setup Instructions

### Step 1: Configure Railway API
Add your Railway details to `.env.local`:

```env
# Railway GraphQL API Configuration
RAILWAY_GRAPHQL_ENDPOINT=https://your-railway-app.railway.app/graphql
RAILWAY_API_TOKEN=your-api-token-here
NEXT_PUBLIC_RAILWAY_GRAPHQL_ENDPOINT=https://your-railway-app.railway.app/graphql
```

### Step 2: Test the Connection
1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/railway-test`
3. Check the connection status and sample data

### Step 3: View Your Products
Once connected, visit: `http://localhost:3000/products`
- See your real product data in beautiful FRNTR-style cards
- Real images, pricing, and inventory status
- Professional grid layout with filters

## 📋 Railway API Requirements

Your Railway GraphQL API should support these queries:

### Products Query
```graphql
query GetProducts($limit: Int, $offset: Int, $category: String) {
  products(limit: $limit, offset: $offset, category: $category) {
    id
    sku
    name
    description
    category { id, name, slug, path }
    images { id, url, alt, type, width, height }
    variants { id, sku, name, attributes, pricing, inventory }
    specifications { power, coverage, weight, dimensions }
    pricing { basePrice, salePrice, currency }
    inventory { stock, available, status }
    metadata { brand, model, featured, tags }
  }
}
```

### Single Product Query
```graphql
query GetProductBySku($sku: String!) {
  product(sku: $sku) {
    # Same fields as above
  }
}
```

### Categories Query
```graphql
query GetCategories {
  categories {
    id
    name
    slug
    path
    description
    productCount
  }
}
```

## 🎯 Expected Data Structure

### Product Images
```typescript
{
  id: "img_001",
  url: "https://your-cdn.com/norko-elite-2000.jpg",
  alt: "Norko Elite 2000W Infrared Heater",
  type: "hero", // "hero" | "gallery" | "lifestyle" | "technical"
  width: 1200,
  height: 800,
  priority: true
}
```

### Product Data
```typescript
{
  id: "prod_001",
  sku: "NRK-ELT-2000-BLK",
  name: "Norko Elite Pro 2000W",
  description: "Premium infrared heater with smart controls...",
  category: {
    id: "cat_indoor",
    name: "Indoor Heaters",
    slug: "indoor",
    path: ["heating", "indoor"]
  },
  specifications: {
    power: "2000W",
    coverage: "40m²",
    weight: "12kg",
    dimensions: "120 x 30 x 8 cm"
  },
  pricing: {
    basePrice: 599.99,
    currency: "USD",
    taxIncluded: true
  },
  inventory: {
    stock: 23,
    available: 23,
    status: "in_stock"
  }
}
```

## 🚀 Benefits of Railway First

### ✅ Immediate Visual Impact
- **Real product images** in hero sections
- **Actual pricing and inventory** data
- **Professional product cards** with real content
- **Live data** that updates automatically

### ✅ Better Development Experience
- **Build with real data** from day one
- **No placeholder content** to manage
- **Immediate feedback** on UI decisions
- **Faster iteration** with actual content

### ✅ Progressive Enhancement
1. **Phase 1**: Beautiful UI with Railway data ✅
2. **Phase 2**: Add Crystallize for enhanced content
3. **Phase 3**: Best of both worlds integration

## 🔄 What Happens Next

### Once Railway is Connected:
1. **Product cards populate** with real images and data
2. **FRNTR-level UI** comes to life with actual content
3. **Professional e-commerce experience** ready immediately
4. **Easy to add Crystallize** enhancement later

### Then Add Crystallize For:
- **Marketing content** and rich descriptions
- **SEO optimization** and meta content
- **Page layouts** and grid compositions
- **Content management** for marketing team

## 📞 Need Help?

1. **Check `/railway-test`** for connection diagnostics
2. **Review console logs** for detailed error messages
3. **Verify API endpoints** and authentication
4. **Test with Postman/GraphQL Playground** first

## 🎯 Ready Status

**Once your Railway API is connected, you'll have:**
- ✅ Professional product display
- ✅ Real-time inventory status
- ✅ Beautiful image galleries
- ✅ Modern e-commerce UI
- ✅ FRNTR-level design quality

**This approach gets you to professional quality faster** because we're building with real content from the start!
