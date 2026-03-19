/**
 * tests/e2e/accessibility.spec.ts
 */

import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Home',        path: '/' },
  { name: 'Dorms',       path: '/dorms' },
  { name: 'Calculator',  path: '/calculator' },
  { name: 'Dorm detail', path: '/dorms/yongji' },
];

for (const { name, path } of PAGES) {
  test(`${name} (${path}): lang attribute is set`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    // hydration 완료 대기: lang 속성이 설정될 때까지 폴링
    await expect(page.locator('html[lang]')).toBeVisible({ timeout: 15000 });
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('ko');
  });

  test(`${name}: page has at least one <main> landmark`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main').first()).toBeVisible({ timeout: 15000 });
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBeGreaterThanOrEqual(1);
  });

  test(`${name}: all images have alt attributes`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const imgsWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imgsWithoutAlt).toBe(0);
  });

  test(`${name}: skip link or first focusable element reachable by Tab`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    // 페이지가 충분히 렌더링될 때까지 대기
    await page.waitForTimeout(500);
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName : null;
    });
    expect(focused).toBeTruthy();
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(focused!)).toBe(true);
  });
}
