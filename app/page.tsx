/**
 * Norko Home Page
 * 
 * Landing page for the Norko infrared heaters e-commerce site.
 * This page serves as the main entry point for customers.
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="fixed w-full top-4 left-1/2 -translate-x-1/2 z-10 max-w-7xl px-4">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-between rounded-full px-6 py-3 shadow-lg">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 text-white font-bold text-lg px-6 py-2 rounded-full">
              NORKO
            </div>
            <span className="text-gray-600 font-medium hidden sm:block">Infrared Heaters</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>
          
          <Link 
            href="/shop" 
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Hero Section */}
          <div className="py-16 lg:py-24">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-blue-600">Norko</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Premium infrared heating solutions for homes, offices, and commercial spaces.
              Experience efficient, comfortable, and sustainable heating.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/shop"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Get Quote
              </Link>
            </div>

            {/* Status Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-green-900">
                  System Online
                </h3>
              </div>
              <p className="text-green-700 text-sm">
                Crystallize Tenant: greedyhippy<br />
                Environment: Development<br />
                Ready for content setup
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Indoor Heating</h3>
              <p className="text-gray-600">
                Efficient heating solutions for homes and offices with precise temperature control.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Outdoor Solutions</h3>
              <p className="text-gray-600">
                Weather-resistant patio and garden heaters for year-round outdoor comfort.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Commercial Grade</h3>
              <p className="text-gray-600">
                Industrial-strength heating systems for warehouses, workshops, and large spaces.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
