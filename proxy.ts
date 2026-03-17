export { auth as proxy } from '@/auth';

export const config = {
  // Protect all /admin routes. All other public routes are unaffected.
  matcher: ['/admin/:path*'],
};
