/**
 * API Route: Get Products from Railway
 * 
 * GET /api/railway/products
 * Query params: limit, offset, category
 */

import { NextRequest, NextResponse } from 'next/server';
import { railwayApi } from '@/lib/railway-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const options = {
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
      category: searchParams.get('category') || undefined,
    };

    const result = await railwayApi.getProducts(options);
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Railway products API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Handle CORS for client-side requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
