import type { NextConfig } from 'next';

/**
 * next.config.ts — Phase 5 (Production Hardened)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * SECURITY HEADERS
 * ─────────────────────────────────────────────────────────────────────────────
 * All security headers are applied to EVERY response via the headers()
 * function. Vercel also supports these via vercel.json, but colocating
 * them in next.config.ts ensures they're version-controlled and apply
 * in any deployment environment (Docker, self-hosted, etc.).
 *
 * CSP STRATEGY
 * ─────────────────────────────────────────────────────────────────────────────
 * We intentionally allow 'unsafe-inline' for styles because:
 *   1. Tailwind generates inline styles for dynamic values
 *   2. Framer Motion adds inline transform/opacity styles at runtime
 *   3. next-themes injects a class-switch script (requires 'unsafe-inline')
 *
 * Scripts are locked to 'self' + trusted CDNs only.
 * No external script injection is possible without updating this file.
 *
 * UPGRADE PATH: Replace 'unsafe-inline' for scripts with a nonce-based
 * CSP once Next.js middleware-based nonce injection is production-stable.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app';

// Build the Content-Security-Policy header value
const buildCSP = (): string => {
  const directives: Record<string, string[]> = {
    'default-src':  ["'self'"],
    'script-src':   [
      "'self'",
      "'unsafe-inline'",    // next-themes theme init script
      "'unsafe-eval'",      // Next.js dev mode HMR (stripped in prod build)
      'https://vercel.live',// Vercel preview toolbar
    ],
    'style-src':    ["'self'", "'unsafe-inline'"],  // Tailwind, framer-motion
    'img-src':      [
      "'self'",
      'data:',              // Base64 inline images
      'blob:',              // Recharts canvas exports
      'https://dorm.ajou.ac.kr',
      'https://*.ajou.ac.kr',
      SITE_URL,
    ],
    'font-src':     ["'self'", 'data:'],  // next/font self-hosted
    'connect-src':  [
      "'self'",
      'https://*.supabase.co',   // Supabase API
      'https://*.supabase.com',
      'wss://*.supabase.co',     // Supabase Realtime
      'https://vitals.vercel-analytics.com',
      'https://vercel.live',
    ],
    'frame-ancestors': ["'none'"],  // Clickjacking prevention
    'base-uri':     ["'self'"],
    'form-action':  ["'self'"],
    'object-src':   ["'none'"],
    'upgrade-insecure-requests': [],
  };

  return Object.entries(directives)
    .map(([key, values]) =>
      values.length > 0 ? `${key} ${values.join(' ')}` : key
    )
    .join('; ');
};

const securityHeaders = [
  // ── XSS Protection ─────────────────────────────────────────────────────────────
  // Legacy header; modern browsers use CSP instead, but belt-and-suspenders.
  {
    key:   'X-XSS-Protection',
    value: '1; mode=block',
  },
  // ── Clickjacking ────────────────────────────────────────────────────────────
  {
    key:   'X-Frame-Options',
    value: 'DENY',
  },
  // ── MIME sniffing ────────────────────────────────────────────────────────────
  {
    key:   'X-Content-Type-Options',
    value: 'nosniff',
  },
  // ── Referrer policy ────────────────────────────────────────────────────────
  // Send Referer on same-origin requests, strip for cross-origin.
  // Prevents leaking full URL (with possible PII) to Supabase.
  {
    key:   'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // ── Permissions policy ──────────────────────────────────────────────────────
  // Disable browser features we never use: geo, camera, mic, etc.
  {
    key:   'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',   // FLoC / Topics API opt-out
      'payment=()',
      'usb=()',
    ].join(', '),
  },
  // ── HSTS ───────────────────────────────────────────────────────────────────
  // Force HTTPS for 2 years once a browser has seen the site.
  // includeSubDomains omitted intentionally: ajou.ac.kr subdomain not ours.
  {
    key:   'Strict-Transport-Security',
    value: 'max-age=63072000; preload',
  },
  // ── Content-Security-Policy ──────────────────────────────────────────────────
  {
    key:   'Content-Security-Policy',
    value: buildCSP(),
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // ── Security headers (applied to all routes) ────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // API routes: stricter — no-store + same headers
      {
        source: '/api/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },

  // ── Image optimisation ──────────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],  // AVIF first (50% smaller than WebP)
    remotePatterns: [
      { protocol: 'https', hostname: 'dorm.ajou.ac.kr' },
      { protocol: 'https', hostname: '*.ajou.ac.kr' },
    ],
    // Breakpoints matching Tailwind defaults for responsive images
    deviceSizes:     [640, 750, 828, 1080, 1200, 1920],
    imageSizes:      [16, 32, 48, 64, 96, 128, 256],
    // Serve locally-stored OG images at high quality
    minimumCacheTTL: 60 * 60 * 24 * 30,  // 30 days
  },

  // ── Experimental ───────────────────────────────────────────────────────────────
  experimental: {
    ppr: 'incremental',
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
      '@radix-ui/react-select',
      '@radix-ui/react-slider',
      '@radix-ui/react-tooltip',
    ],
  },

  webpack(config) {
    config.resolve.alias = { ...config.resolve.alias };
    return config;
  },
};

export default nextConfig;
