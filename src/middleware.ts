import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value;
  if (!currentUser) return Response.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/cards/post'],
};
