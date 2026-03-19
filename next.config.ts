import type { NextConfig } from 'next';

/**
 * next.config.ts
 *
 * Next.js 16 uses Turbopack by default.
 * - webpack() callback removed: an empty alias merge is a no-op and
 *   its mere presence triggers the "webpack config + no turbopack config"
 *   hard error in Next.js 16 Turbopack builds.
 * - turbopack: {} added: silences the "no turbopack config" warning
 *   and makes the intention explicit.
 * - cacheComponents removed: not a valid top-level Next.js config key;
 *   PPR is controlled via experimental.ppr.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app';

const buildCSP = (): string => {
  const directives: Record<string, string[]> = {
    'default-src':  ["'self'"],
    'script-src':   [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://vercel.live',
    ],
    'style-src':    ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      'https://dorm.ajou.ac.kr',
      'https://*.ajou.ac.kr',
      SITE_URL,
    ],
    'font-src':    ["'self'", 'data:'],
    'connect-src': [
      "'self'",
      'https://*.supabase.co',
      'https://*.supabase.com',
      'wss://*.supabase.co',
      'https://vitals.vercel-analytics.com',
      'https://vercel.live',
    ],
    'frame-ancestors':           ["'none'"],
    'base-uri':                  ["'self'"],
    'form-action':               ["'self'"],
    'object-src':                ["'none'"],
    'upgrade-insecure-requests': [],
  };

  return Object.entries(directives)
    .map(([key, vals]) => (vals.length ? `${key} ${vals.join(' ')}` : key))
    .join('; ');
};

const securityHeaders = [
  { key: 'X-XSS-Protection',        value: '1; mode=block' },
  { key: 'X-Frame-Options',         value: 'DENY' },
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; preload' },
  { key: 'Content-Security-Policy',   value: buildCSP() },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // Empty turbopack config: opts in explicitly and silences the
  // "webpack config present / no turbopack config" build error.
  turbopack: {},

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'dorm.ajou.ac.kr' },
      { protocol: 'https', hostname: '*.ajou.ac.kr' },
    ],
    deviceSizes:    [640, 750, 828, 1080, 1200, 1920],
    imageSizes:     [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
      '@radix-ui/react-select',
      '@radix-ui/react-slider',
      '@radix-ui/react-tooltip',
    ],
  },
};

export default nextConfig;
