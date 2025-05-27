'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const markets = cookieStore.get('markets');

    if (!markets) {
        return [];
    }

    return NextResponse.json(JSON.parse(markets.value));

}

export async function POST(req: Request) {
    const { markets } = await req.json();
    const cookiesStorage = await cookies();

    cookiesStorage.set('markets', JSON.stringify(markets));

    return NextResponse.next();
}