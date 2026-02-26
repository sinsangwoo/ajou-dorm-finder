/**
 * playwright.config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Playwright E2E test configuration for '아주대 긱사 어디가'.
 *
 * SCOPE
 *   Core user journeys only — no exhaustive permutations.
 *   The goal is confidence in happy paths + key error states.
 *
 * LOCAL RUN
 *   npx playwright install --with-deps
 *   npx playwright test
 *
 * CI RUN (GitHub Actions)
 *   See .github/workflows/e2e.yml
 *   Tests run against the Vercel preview deployment URL.
 *
 * REPORTERS
 *   - CI: GitHub Actions (machine-readable summary)
 *   - Local: HTML report (playwright-report/)
 */

import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',

  // Run tests in each file in parallel
  fullyParallel: true,

  // Fail the build on CI if tests are accidentally skipped
  forbidOnly: !!process.env.CI,

  // 2 retries on CI for flakiness tolerance, 0 locally
  retries: process.env.CI ? 2 : 0,

  // Parallelism: 4 workers on CI, 2 locally (keeps CPU usage sane)
  workers: process.env.CI ? 4 : 2,

  // ── Reporters ────────────────────────────────────────────────────────────
  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: 'playwright-report', open: 'on-failure' }]],

  // ── Global settings shared by all tests ──────────────────────────────────────
  use: {
    baseURL: BASE_URL,

    // Capture trace on first retry to help debug flaky tests
    trace:      'on-first-retry',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',

    // Navigation timeout: generous because ISR pages may cold-start
    navigationTimeout: 30_000,
    actionTimeout:     10_000,

    // Korean locale to match target users
    locale:   'ko-KR',
    timezoneId: 'Asia/Seoul',
  },

  // ── Browser matrix ──────────────────────────────────────────────────────────
  // Students use: Chrome (desktop/mobile), iOS Safari (iPhone)
  // We skip Firefox & WebKit desktop to keep CI time under 3 min.
  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use:  { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use:  { ...devices['iPhone 14'] },
    },
  ],

  // ── Local dev server ─────────────────────────────────────────────────────────
  // Only starts the server if PLAYWRIGHT_BASE_URL is not set.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command:            'npm run build && npm run start',
        url:                BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout:            180_000,
      },
});
