/**
 * vitest.config.ts
 *
 * @vitejs/plugin-react-swc 를 사용하는 이유:
 *   - SWC 기반 변환 → Babel 대비 10-20x 빠른 테스트 트랜스파일
 *   - Next.js 16 canary Turbopack 환경과 동일한 SWC 파이프라인
 *   - React 19 JSX transform 자동 지원 (runtime: 'automatic')
 *
 * jsdom 환경: DOM API가 필요한 React 컴포넌트 테스트용.
 * scoreEngine.ts 같은 순수 TS 유닛 테스트도 jsdom 환경에서 문제없이 동작.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/lib/**', 'src/hooks/**'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
