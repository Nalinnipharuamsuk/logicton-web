import { NextResponse } from 'next/server';
import { getCompanyInfo } from '@/lib/content';
import type { ApiResponse } from '@/types';

export async function GET() {
  try {
    const data = await getCompanyInfo();
    
    if (!data) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Company information not found' },
        { status: 404 }
      );
    }
    
    // Cache for 5 minutes (revalidate every 300s)
    return NextResponse.json<ApiResponse>({ success: true, data }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch company content' },
      { status: 500 }
    );
  }
}
