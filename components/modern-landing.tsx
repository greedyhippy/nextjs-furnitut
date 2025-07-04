/**
 * Modern Norko Landing Page - FRNTR Style
 * 
 * Clean, minimalist e-commerce design inspired by modern furniture stores
 * Adapted for Norko infrared heater brand
 */

import Link from 'next/link';
import Image from 'next/image';

export default function ModernLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-wider text-gray-900">
                NORKO
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Heaters, parts, categories"
                  className="w-64 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
              
              <Link href="/shop" className="text-gray-700 hover:text-gray-900 font-medium">
                Shop
              </Link>
              <Link href="/stories" className="text-gray-700 hover:text-gray-900 font-medium">
                Stories
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                  Room ▼
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                  Solutions ▼
                </button>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900">
                👤
              </button>
              <button className="text-gray-700 hover:text-gray-900 relative">
                🛒
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - FRNTR Style */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Content Side */}
            <div className="flex items-center px-8 lg:px-16 py-16 lg:py-24">
              <div className="max-w-lg">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  WARMTH
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  The first step in creating your ideal living space
                  is to find the perfect heating solution that naturally
                  works with your lifestyle.
                </p>
                <button className="bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors">
                  See our heater collection
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-100">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for product image */}
                <div className="relative">
                  {/* Main heater */}
                  <div className="w-80 h-64 bg-gray-800 rounded-lg shadow-2xl transform -rotate-3">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full opacity-75"></div>
                    <div className="absolute bottom-4 right-4 text-white text-xs font-medium">
                      NORKO ELITE
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-200 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content Section - FRNTR Style */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Block */}
            <div className="bg-rose-50 p-12 lg:p-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Time to get comfortable
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                The first step in determining your ideal heating solution
                is to figure out when your space feels naturally
                warm and comfortable.
              </p>
            </div>

            {/* Image Block */}
            <div className="relative bg-blue-50 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl lg:text-8xl font-black text-gray-900 mb-4">
                  STAY<br />
                  WARM<br />
                  ALWAYS.
                </div>
                
                {/* Product mockup */}
                <div className="mt-8">
                  <div className="w-32 h-24 bg-gray-700 rounded-lg mx-auto shadow-lg">
                    <div className="p-2 text-white text-xs">
                      Norko Smart Control
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Card Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Heating Solutions
            </h2>
            <p className="text-gray-600 text-lg">
              Premium infrared heaters for every space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Indoor Heaters */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  <div className="text-6xl">🏠</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Indoor Collection
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Perfect for living rooms, bedrooms, and offices
                  </p>
                </div>
              </div>
            </div>

            {/* Outdoor Heaters */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                  <div className="text-6xl">🌿</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Outdoor Collection
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Weather-resistant patio and garden heaters
                  </p>
                </div>
              </div>
            </div>

            {/* Commercial Heaters */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <div className="text-6xl">🏭</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Commercial Systems
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Industrial-grade heating for large spaces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stay warm with our latest updates
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Get exclusive access to new products, heating tips, and special offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">NORKO</h3>
              <p className="text-gray-400 text-sm">
                Premium infrared heating solutions for modern living.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/indoor" className="hover:text-white">Indoor Heaters</Link></li>
                <li><Link href="/outdoor" className="hover:text-white">Outdoor Heaters</Link></li>
                <li><Link href="/commercial" className="hover:text-white">Commercial Systems</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/installation" className="hover:text-white">Installation Guide</Link></li>
                <li><Link href="/warranty" className="hover:text-white">Warranty</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Norko</Link></li>
                <li><Link href="/sustainability" className="hover:text-white">Sustainability</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2025 Norko. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
