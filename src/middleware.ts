import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter: max 5 requests per IP per minute on API routes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanupAt = 0;

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  for (const [key, value] of rateLimitMap.entries()) {
    if (now >= value.resetAt) rateLimitMap.delete(key);
  }
}

function getRateLimitKey(req: NextRequest): string {
  // Prefer trusted platform-injected headers in order of reliability.
  // x-forwarded-for is read last as it can be spoofed in some proxy setups.
  const candidates = [
    req.headers.get('x-real-ip'),
    req.headers.get('cf-connecting-ip'),
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
  ];

  const ip = candidates.find((v) => v && v.length > 0);

  // Avoid grouping all anonymous clients under a single shared key.
  return ip ?? `anon:${crypto.randomUUID()}`;
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(req);
    const now = Date.now();

    cleanupExpiredEntries(now);

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
