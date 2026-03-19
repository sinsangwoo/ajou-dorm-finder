import type { NextConfig } from 'next';

/**
 * next.config.ts
 *
 * Key decisions for Next.js 16 + Vite SPA coexistence:
 *
 * 1. turbopack: {}  — required because webpack() was removed.
 *    Next.js 16 Turbopack is the default builder; an empty turbopack
 *    config opts in explicitly and silences the hard build error.
 *
 * 2. pageExtensions: ['page.tsx', ...]  — critical for SPA coexistence.
 *    This project has BOTH src/app/ (Next.js App Router) AND
 *    src/pages/ (Vite SPA components that use react-router-dom).
 *    Without this, Next.js Pages Router scans src/pages/ and tries to
 *    SSR every .tsx file, crashing on react-router-dom hooks that
 *    require RouterContext (which doesn't exist in SSR).
 *    By restricting pageExtensions to *.page.tsx, no file in
 *    src/pages/ matches (none are named *.page.tsx), so Pages Router
 *    is effectively disabled without deleting the folder.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app';

const buildCSP = (): string => {
  const directives: Record<string, string[]> = {
    'default-src':  ["'self'"],
    'script-src':   ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://vercel.live'],
    'style-src':    ["'self'", "'unsafe-inline'"],
    'img-src':      ["'self'", 'data:', 'blob:', 'https://dorm.ajou.ac.kr', 'https://*.ajou.ac.kr', SITE_URL],
    'font-src':     ["'self'", 'data:'],
    'connect-src':  ["'self'", 'https://*.supabase.co', 'https://*.supabase.com', 'wss://*.supabase.co', 'https://vitals.vercel-analytics.com', 'https://vercel.live'],
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
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; preload' },
  { key: 'Content-Security-Policy',   value: buildCSP() },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // Turbopack: required for Next.js 16 (default builder).
  turbopack: {},

  // Pages Router 비활성화:
  // src/pages/ 폴더는 Vite SPA(react-router-dom) 전용 컴포넌트를 담는다.
  // *.page.tsx 확장자를 소유한 파일이 없으므로
  // Next.js Pages Router는 어떤 파일도 라우트로 등록하지 않는다.
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'dorm.ajou.ac.kr' },
      { protocol: 'https', hostname: '*.ajou.ac.kr' },
    ],
    deviceSizes:     [640, 750, 828, 1080, 1200, 1920],
    imageSizes:      [16, 32, 48, 64, 96, 128, 256],
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
