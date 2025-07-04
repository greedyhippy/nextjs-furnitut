// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  description: Description;
  specifications: Specifications;
  features: Features;
  images: ProductImage[];
  variants: ProductVariant[];
  price: number;
  currency: string;
}

export interface Description {
  plainText?: string;
  html?: string;
}

export interface Features {
  plainText?: string;
  html?: string;
}

export interface Specifications {
  wattage: number;
  dimensions: string;
  weight: number;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  caption?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock?: number;
}

// API Response Types
export interface ProductsResponse {
  products: Product[];
}

export interface CategoriesResponse {
  categories: string[];
}

export interface SearchProductsResponse {
  searchProducts: Product[];
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface FilterSidebarProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
}
