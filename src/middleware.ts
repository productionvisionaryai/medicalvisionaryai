import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isOriginAllowed } from '@/lib/cors-config';

/**
 * Security Middleware
 * 
 * This middleware adds security headers to all responses and validates
 * CORS for API routes to protect against common web vulnerabilities.
 */
export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const origin = request.headers.get('origin');

    // ============================================
    // Security Headers (Applied to all routes)
    // ============================================

    // DNS prefetching control
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    // Enforce HTTPS in production
    if (process.env.NODE_ENV === 'production') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=63072000; includeSubDomains; preload'
        );
    }

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // XSS Protection (legacy browsers)
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions policy - restrict access to sensitive APIs
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );

    // Content Security Policy
    const cspDirectives = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://api.groq.com https://api.resend.com",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
    ];

    response.headers.set(
        'Content-Security-Policy',
        cspDirectives.join('; ')
    );

    // ============================================
    // CORS Validation for API Routes
    // ============================================

    if (request.nextUrl.pathname.startsWith('/api/')) {
        // Check if origin is allowed
        if (origin && !isOriginAllowed(origin)) {
            console.warn(`🚫 Blocked request from unauthorized origin: ${origin}`);
            return new NextResponse(
                JSON.stringify({
                    error: 'Forbidden',
                    message: 'Origin not allowed',
                }),
                {
                    status: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '',
                    },
                }
            );
        }

        // Set CORS headers for allowed origins
        if (origin && isOriginAllowed(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Credentials', 'true');
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
        }
    }

    return response;
}

// ============================================
// Middleware Configuration
// ============================================

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
