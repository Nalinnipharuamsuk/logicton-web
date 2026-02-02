import { NextResponse } from 'next/server';
import { getContactInquiries, getInquiryStats } from '@/lib/contact-inquiries';
import type { ApiResponse } from '@/types';

export async function GET() {
  try {
    const inquiries = await getContactInquiries();
    const stats = await getInquiryStats();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        inquiries,
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to fetch contact inquiries' },
      { status: 500 }
    );
  }
}
