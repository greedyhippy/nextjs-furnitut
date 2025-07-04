/**
 * API Route: Get Single Product from Railway
 * 
 * GET /api/railway/products/[sku]
 */

import { NextRequest, NextResponse } from 'next/server';
import { railwayApi } from '@/lib/railway-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    const { sku } = params;
    
    if (!sku) {
      return NextResponse.json(
        { success: false, error: 'SKU is required' },
        { status: 400 }
      );
    }

    const result = await railwayApi.getProductBySku(sku);
    
    if (!result.product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error(`Railway product API error for SKU ${params.sku}:`, error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
