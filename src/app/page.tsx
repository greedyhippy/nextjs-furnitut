'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS, GET_CATEGORIES } from '@/lib/queries';
import { Product } from '@/types';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch products
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS, {
    variables: { 
      first: 20,
      category: selectedCategory || undefined 
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  const products: Product[] = productsData?.products || [];
  const categories: string[] = categoriesData?.categories || [];

  // Filter products by search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.description.plainText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Norko
              </h1>
              <span className="ml-2 text-sm text-gray-500">Infrared Heaters</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Premium Infrared Heating Solutions
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover energy-efficient, stylish infrared heaters for modern homes and offices
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCategory ? `${selectedCategory} Heaters` : 'All Products'}
                </h3>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products found
                </span>
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-2">
                  Showing results for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>

            <ProductGrid
              products={filteredProducts}
              loading={productsLoading}
              error={productsError?.message}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Norko</h4>
              <p className="text-gray-400">
                Premium infrared heating solutions for modern living.
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-4">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Panel Heaters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mirror Heaters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Glass Heaters</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Installation Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Norko. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
