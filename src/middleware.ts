import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/auth/login',
  '/auth/signup', 
  '/auth/callback',
  '/api/webhooks(.*)',
  '/about(.*)',
  '/blog(.*)',
  '/certifications(.*)',
  '/contact(.*)',
  '/education(.*)',
  '/experience(.*)',
  '/not-found(.*)',
  '/projects(.*)',
  '/resume(.*)',
  '/services(.*)',
  '/sitemap(.*)',
  '/skills(.*)',
  '/api/auth/check-whitelist'
])

const isCMSRoute = createRouteMatcher(['/cms(.*)'])

const middleware = clerkMiddleware(async (auth, req) => {
  // Always allow public routes first (including all auth pages)
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Protect CMS routes - require authentication
  if (isCMSRoute(req)) {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    
    return NextResponse.next()
  }

  // For any other routes, allow access (make them public by default)
  return NextResponse.next()
}, {
  afterSignOutUrl: '/auth/login'
})

export default middleware

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
