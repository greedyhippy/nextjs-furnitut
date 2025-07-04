/**
 * Products Page - Railway Data Integration
 * 
 * Modern product grid using real Railway API data
 */

import { Suspense } from 'react';
import { fetchProductsForPage, fetchCategoriesForNav } from '@/lib/railway-api';
import ProductCard from '@/components/product/product-card';
import { RailwayProduct } from '@/types/railway-types';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    limit?: string;
    page?: string;
  };
}

// Loading component
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Products Grid Component
async function ProductsGrid({ searchParams }: ProductsPageProps) {
  const limit = parseInt(searchParams.limit || '12');
  const page = parseInt(searchParams.page || '1');
  const offset = (page - 1) * limit;
  
  const { products, error } = await fetchProductsForPage({
    limit,
    offset,
    category: searchParams.category,
  });

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 mb-4">⚠️ Failed to load products</div>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product: RailwayProduct) => (
        <ProductCard
          key={product.id}
          product={product}
          size="medium"
          showQuickActions={true}
        />
      ))}
    </div>
  );
}

// Category Filter Component
async function CategoryFilter({ currentCategory }: { currentCategory?: string }) {
  const { categories, error } = await fetchCategoriesForNav();
  
  if (error || !categories) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <a
        href="/products"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategory 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </a>
      {categories.map((category: any) => (
        <a
          key={category.id}
          href={`/products?category=${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === category.slug
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}

// Main Products Page
export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Norko Infrared Heaters
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of premium infrared heating solutions. 
              From compact indoor units to powerful commercial systems.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <Suspense fallback={
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        }>
          <CategoryFilter currentCategory={searchParams.category} />
        </Suspense>

        {/* Products Grid */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsGrid searchParams={searchParams} />
        </Suspense>

        {/* Load More / Pagination */}
        <div className="mt-16 text-center">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Load More Products
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our heating experts are here to help you find the perfect infrared heater for your space.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Our Experts
          </button>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Infrared Heaters | Norko Premium Heating Solutions',
  description: 'Browse our complete range of premium infrared heaters. Energy-efficient heating for homes, offices, and commercial spaces.',
};
