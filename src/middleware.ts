import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter: max 5 requests per IP per minute on API routes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(req);
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else {
      entry.count += 1;

      if (entry.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.' },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
            },
          }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
