/**
 * tests/e2e/accessibility.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Basic accessibility checks.
 * Full axe-core analysis would require @axe-core/playwright;
 * these tests use Playwright's built-in a11y APIs as a lightweight check.
 */

import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Home',       path: '/' },
  { name: 'Dorms',      path: '/dorms' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'Dorm detail',path: '/dorms/yongji' },
];

for (const { name, path } of PAGES) {
  test(`${name} (${path}): lang attribute is set`, async ({ page }) => {
    await page.goto(path);
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('ko');
  });

  test(`${name}: page has at least one <main> landmark`, async ({ page }) => {
    await page.goto(path);
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBeGreaterThanOrEqual(1);
  });

  test(`${name}: all images have alt attributes`, async ({ page }) => {
    await page.goto(path);
    // Find all <img> without alt (or with empty alt on non-decorative images)
    const imgsWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imgsWithoutAlt).toBe(0);
  });

  test(`${name}: skip link or first focusable element reachable by Tab`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName : null;
    });
    // Must be a focusable element (A, BUTTON, INPUT, etc.)
    expect(focused).toBeTruthy();
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(focused!)).toBe(true);
  });
}
