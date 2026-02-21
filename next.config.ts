import type { NextConfig } from 'next';

/**
 * Next.js 15 App Router Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Key decisions:
 *  - output: 'standalone'  →  Docker-friendly production build
 *  - reactStrictMode: true →  Detect side-effects / double-renders in dev
 *  - experimental.ppr      →  Partial Pre-Rendering (Next.js 15 opt-in)
 *    Allows static shell + streaming RSC segments for sub-1s LCP
 */
const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

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
    // Partial Pre-Rendering: static shell streamed immediately,
    // dynamic segments (e.g. notices from Supabase) fill in async.
    // Enable per-route with `export const experimental_ppr = true`
    ppr: 'incremental',

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
