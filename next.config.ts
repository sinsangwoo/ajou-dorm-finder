import type { NextConfig } from 'next';

/**
 * next.config.ts
 *
 * 주요 설계 결정:
 *
 * 1. output: 'standalone' 제거
 *    Docker 배포용이며 Vercel에서는 불필요.
 *    standalone이 있으면 `npm start`(next start)가 동작하지 않아
 *    CI E2E 서버가 실패함.
 *
 * 2. turbopack: {}
 *    Next.js 16 기본 빌더. 명시적 opt-in으로 빌드 에러 억제.
 *
 * 3. pageExtensions 제거 (중요!)
 *    pageExtensions을 커스터마이징하면 sitemap.ts, robots.ts 같은
 *    Next.js App Router 특수 파일도 동시에 필터마어다.
 *    이로 인해 /sitemap.xml, /robots.txt가 404를 반환함.
 *
 *    src/pages/ 폴더의 Vite SPA 컴포넌트들은 이미 `export {}`로
 *    비워졌으므로 default export가 없어 Pages Router에 등록되지 않음.
 *    pageExtensions 없이도 안전함.
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
  reactStrictMode: true,
  turbopack: {},
  // pageExtensions 제거: sitemap.ts / robots.ts / layout.tsx 등
  // App Router 특수 파일이 필터마어지는 부작용 제거

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
