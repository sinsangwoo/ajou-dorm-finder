import type { NextConfig } from 'next';

/**
 * Next.js 15 App Router Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Key decisions:
 * - output: 'standalone'  →  Docker-friendly production build
 * - reactStrictMode: true →  Detect side-effects / double-renders in dev
 * - cacheComponents: true →  Partial Pre-Rendering (Updated for Next.js 16)
 * Allows static shell + streaming RSC segments for sub-1s LCP
 */
const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // [수정] experimental 안에 있던 ppr이 이제 최상위의 cacheComponents로 이동했습니다.
  cacheComponents: true,

  // ── Image optimisation ──────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Allow Ajou official domain if we ever fetch images server-side
      { protocol: 'https', hostname: 'dorm.ajou.ac.kr' },
      { protocol: 'https', hostname: '*.ajou.ac.kr' },
    ],
  },

  // ── Experimental ────────────────────────────────────────────────────────────
  experimental: {

    // Optimise server component import tree-shaking
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
      '@radix-ui/react-select',
      '@radix-ui/react-slider',
      '@radix-ui/react-tooltip',
    ],
  },

  // ── Webpack tweaks ──────────────────────────────────────────────────────────
  // Suppress "Module not found" for optional peer deps (e.g. framer-motion
  // uses optional require() for some renderers).
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

export default nextConfig;
