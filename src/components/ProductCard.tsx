import Image from 'next/image';
import { ProductCardProps } from '@/types';

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const mainImage = product.images[0];
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price);

  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Specifications */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Power:</span>
            <span className="ml-1">{product.specifications.wattage}W</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Dimensions:</span>
            <span className="ml-1">{product.specifications.dimensions}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Weight:</span>
            <span className="ml-1">{product.specifications.weight}kg</span>
          </div>
        </div>

        {/* Description Preview */}
        {product.description.plainText && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description.plainText}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formattedPrice}
          </span>
          
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
