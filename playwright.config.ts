/**
 * playwright.config.ts
 */

import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,  // CI에서 4는 너무 많아 메모리 부족 가능

  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: 'playwright-report', open: 'on-failure' }]],

  use: {
    baseURL: BASE_URL,
    trace:      'on-first-retry',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
    // 네비게이션 타임아웃 증가: Next.js cold start 여유
    navigationTimeout: 60_000,
    // 액션 타임아웃 증가: hydration 대기 여유
    actionTimeout:     20_000,
    locale:     'ko-KR',
    timezoneId: 'Asia/Seoul',
  },

  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
  ],

  // CI에서는 PLAYWRIGHT_BASE_URL이 세팅되므로 webServer 사용 안 함
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command:             'npm run build && npm run start',
        url:                 BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout:             180_000,
      },
});
