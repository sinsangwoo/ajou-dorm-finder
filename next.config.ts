import type { NextConfig } from 'next';

/**
 * next.config.ts
 *
 * - output: 'standalone' 제거: Docker 배포용이며 Vercel에서는 불필요.
 *   standalone이 있으면 `npm start`(next start)가 동작하지 않아 CI E2E 서버가 실패함.
 *
 * - turbopack: {}: Next.js 16 기본 빌더. 명시적으로 opt-in하여 에러 억제.
 *
 * - pageExtensions: src/pages/의 Vite SPA 컴포넌트가
 *   Next.js Pages Router로 스캔되어 SSR crash하는 것을 방지.
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
  // output: 'standalone' 제거 — npm start / Vercel 먹실 쭔인이 실패하는 원인
  reactStrictMode: true,
  turbopack: {},
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
      'lucide-react', 'recharts', 'framer-motion',
      '@radix-ui/react-select', '@radix-ui/react-slider', '@radix-ui/react-tooltip',
    ],
  },
};

export default nextConfig;
