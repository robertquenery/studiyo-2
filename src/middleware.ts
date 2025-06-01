import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if user is authenticated (has Firebase auth token)
  const token = request.cookies.get('auth-token');
  const isAuthenticated = !!token;

  // Redirect authenticated users away from public routes
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
};
