/**
 * Professional Product Card Component
 * 
 * FRNTR-level product card using real Railway API data
 */

import Image from 'next/image';
import Link from 'next/link';
import { RailwayProduct, ProductVariant } from '@/types/railway-types';

interface ProductCardProps {
  product: RailwayProduct;
  variant?: ProductVariant;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showQuickActions?: boolean;
}

export function ProductCard({ 
  product, 
  variant, 
  className = '',
  size = 'medium',
  showQuickActions = true 
}: ProductCardProps) {
  // Use variant data if provided, otherwise use main product data
  const displayVariant = variant || product.variants?.[0];
  const pricing = displayVariant?.pricing || product.pricing;
  const inventory = displayVariant?.inventory || product.inventory;
  const images = displayVariant?.images || product.images;
  
  // Get the hero image or first available image
  const heroImage = images.find(img => img.type === 'hero') || images[0];
  
  // Size variants
  const sizeClasses = {
    small: 'aspect-[4/3]',
    medium: 'aspect-[4/3]',
    large: 'aspect-[3/2]'
  };

  const cardClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  // Stock status
  const stockStatus = {
    in_stock: { text: 'In Stock', color: 'text-green-600' },
    low_stock: { text: 'Low Stock', color: 'text-amber-600' },
    out_of_stock: { text: 'Out of Stock', color: 'text-red-600' },
    discontinued: { text: 'Discontinued', color: 'text-gray-500' }
  };

  const stock = stockStatus[inventory.status] || stockStatus.in_stock;

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${className}`}>
      {/* Image Container */}
      <div className={`relative ${sizeClasses[size]} overflow-hidden bg-gray-50`}>
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Fallback for missing images
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="text-6xl opacity-50">🔥</div>
          </div>
        )}
        
        {/* Overlay on hover */}
        {showQuickActions && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <Link
                href={`/products/${product.sku}`}
                className="block w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
              >
                View Details
              </Link>
              {inventory.status === 'in_stock' && (
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                  Quick Add to Cart
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Featured badge */}
        {product.metadata.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        
        {/* Sale badge */}
        {pricing.salePrice && pricing.salePrice < pricing.basePrice && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cardClasses[size]}>
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.category.name}
          </span>
          <span className={`text-xs font-medium ${stock.color}`}>
            {stock.text}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          <Link href={`/products/${product.sku}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Key Specs */}
        {product.specifications && (
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
            {product.specifications.power && (
              <span className="flex items-center gap-1">
                ⚡ {product.specifications.power}
              </span>
            )}
            {product.specifications.coverage && (
              <span className="flex items-center gap-1">
                📐 {product.specifications.coverage}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {pricing.salePrice && pricing.salePrice < pricing.basePrice ? (
                <>
                  <span className="text-xl font-light text-gray-900">
                    ${pricing.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${pricing.basePrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-light text-gray-900">
                  ${pricing.basePrice.toLocaleString()}
                </span>
              )}
            </div>
            {pricing.taxIncluded && (
              <span className="text-xs text-gray-500">Tax included</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Variants Preview */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Available in:</span>
              <div className="flex gap-1">
                {product.variants.slice(0, 4).map((v, index) => (
                  <div
                    key={v.id}
                    className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300"
                    title={v.name}
                  />
                ))}
                {product.variants.length > 4 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +{product.variants.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
