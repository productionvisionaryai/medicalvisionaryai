/**
 * CORS Configuration and Origin Validation
 * 
 * This module manages Cross-Origin Resource Sharing (CORS) settings
 * to ensure API endpoints are only accessible from approved origins.
 */

// ============================================
// Allowed Origins by Environment
// ============================================

const ALLOWED_ORIGINS = {
    production: [
        'https://medical.visionaryai.lat',
        'https://www.medical.visionaryai.lat',
        'https://visionaryai.lat',
        'https://www.visionaryai.lat',
    ],
    staging: [
        'https://staging.medical.visionaryai.lat',
        'https://preview.medical.visionaryai.lat',
        'http://localhost:3000',
        'http://localhost:3001',
    ],
    development: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://[::1]:3000',
    ],
} as const;

// ============================================
// Helper Functions
// ============================================

/**
 * Get allowed origins for the current environment
 */
export function getAllowedOrigins(): string[] {
    const env = process.env.NODE_ENV || 'development';

    // Allow custom origins from environment variable (comma-separated)
    const customOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean);
    if (customOrigins && customOrigins.length > 0) {
        return customOrigins;
    }

    // Fall back to predefined origins
    const origins = ALLOWED_ORIGINS[env as keyof typeof ALLOWED_ORIGINS];
    return origins ? [...origins] : [...ALLOWED_ORIGINS.development];
}

/**
 * Check if an origin is allowed to access the API
 */
export function isOriginAllowed(origin: string | null): boolean {
    // No origin header (same-origin requests or non-browser clients)
    if (!origin) {
        // In development, allow requests without origin
        // In production, require origin header for CORS requests
        return process.env.NODE_ENV === 'development';
    }

    // Handle special cases
    if (origin === 'null') {
        // 'null' origin can occur with file:// protocol or sandboxed iframes
        // Only allow in development
        return process.env.NODE_ENV === 'development';
    }

    const allowedOrigins = getAllowedOrigins();

    // Exact match
    if (allowedOrigins.includes(origin)) {
        return true;
    }

    // In development, also allow HTTP version of HTTPS origins
    if (process.env.NODE_ENV === 'development') {
        const httpVersion = origin.replace('https://', 'http://');
        if (allowedOrigins.includes(httpVersion)) {
            return true;
        }
    }

    return false;
}

/**
 * Get CORS headers for a given origin
 */
export function getCorsHeaders(origin: string | null): Record<string, string> {
    const isAllowed = isOriginAllowed(origin);

    if (!isAllowed) {
        return {
            'Access-Control-Allow-Origin': '',
        };
    }

    return {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
        'Access-Control-Max-Age': '86400', // 24 hours
        'Access-Control-Allow-Credentials': 'true',
    };
}

/**
 * Get CORS headers for preflight OPTIONS requests
 */
export function getPreflightHeaders(origin: string | null): Record<string, string> {
    const isAllowed = isOriginAllowed(origin);

    if (!isAllowed) {
        return {
            'Access-Control-Allow-Origin': '',
        };
    }

    return {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'true',
    };
}

// ============================================
// Exports
// ============================================

export default {
    getAllowedOrigins,
    isOriginAllowed,
    getCorsHeaders,
    getPreflightHeaders,
};
