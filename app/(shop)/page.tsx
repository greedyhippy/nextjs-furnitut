// @ts-nocheck
import React from 'react';
import Link from 'next/link';

export default async function ShopLandingPage() {
    return (
        <main className="max-w-6xl mx-auto min-h-screen pt-20">
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to Norko Shop
                </h1>
                <p className="text-xl mb-8">
                    Premium Infrared Heating Solutions
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">
                        ✅ Shop Ready
                    </h2>
                    <p className="text-blue-700">
                        Crystallize Tenant: greedyhippy | Products coming soon
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Indoor Heaters</h3>
                        <p className="text-gray-600 mb-4">Efficient heating for homes and offices</p>
                        <Link href="/category/indoor" className="text-blue-600 hover:text-blue-800">
                            Browse Indoor →
                        </Link>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Outdoor Heaters</h3>
                        <p className="text-gray-600 mb-4">Weather-resistant patio and garden heating</p>
                        <Link href="/category/outdoor" className="text-blue-600 hover:text-blue-800">
                            Browse Outdoor →
                        </Link>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Commercial</h3>
                        <p className="text-gray-600 mb-4">Industrial-grade heating solutions</p>
                        <Link href="/category/commercial" className="text-blue-600 hover:text-blue-800">
                            Browse Commercial →
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
