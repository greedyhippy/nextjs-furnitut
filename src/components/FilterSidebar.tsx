'use client';

import { useState } from 'react';
import { FilterSidebarProps } from '@/types';

export default function FilterSidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  priceRange, 
  onPriceRangeChange 
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(priceRange?.[0] || 0);
  const [maxPrice, setMaxPrice] = useState(priceRange?.[1] || 1000);

  const handlePriceChange = () => {
    if (onPriceRangeChange) {
      onPriceRangeChange([minPrice, maxPrice]);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
      
      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategorySelect('')}
            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              !selectedCategory
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      {onPriceRangeChange && (
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="min-price" className="block text-xs font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                id="min-price"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-xs font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                id="max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1000"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Additional Filters */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Power Rating</h4>
        <div className="space-y-2">
          {['0-500W', '500-1000W', '1000-1500W', '1500W+'].map((range) => (
            <label key={range} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
