import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's an admin route (excluding login)
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/th/admin/dashboard') || pathname.startsWith('/en/admin/dashboard')) {
    const token = await getToken({ req: request });
    
    if (!token) {
      // Redirect to login if not authenticated
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/th/admin/dashboard/:path*',
    '/en/admin/dashboard/:path*',
  ],
};