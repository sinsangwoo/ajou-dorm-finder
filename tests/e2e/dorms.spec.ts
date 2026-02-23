/**
 * tests/e2e/dorms.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Dorm listing and detail page tests.
 *
 * Tests are structured around the student mental model:
 *   - Browse all dorms
 *   - Filter by gender / type
 *   - Click into a dorm for details
 *   - See official data badge + disclaimer
 */

import { test, expect } from '@playwright/test';

// The 6 known dorm IDs — must match src/data/dormitoryData.ts
const DORM_IDS = ['namje', 'yongji', 'hwahong', 'gwanggyo', 'international', 'ilsin'];

test.describe('Dorms listing (/dorms)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dorms');
  });

  test('renders page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /기숙사/ })
    ).toBeVisible();
  });

  test('shows OfficialDataBadge (trust signal)', async ({ page }) => {
    await expect(page.locator('text=/공식|2026/')).toBeVisible();
  });

  test('renders at least 6 dorm cards', async ({ page }) => {
    // Cards are links pointing to /dorms/<id>
    const cards = page.locator('a[href^="/dorms/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('filter button opens panel', async ({ page }) => {
    await page.getByRole('button', { name: /조건 필터/ }).click();
    // Panel should show gender options
    await expect(page.locator('text=/남학생|여학생/')).toBeVisible();
  });

  test('filter by 여학생 + 신입생 shows eligible dorms', async ({ page }) => {
    await page.getByRole('button', { name: /조건 필터/ }).click();
    await page.getByRole('button', { name: '여학생' }).click();
    await page.getByRole('button', { name: '신입생' }).click();
    await page.getByRole('button', { name: /필터 적용/ }).click();
    // URL should update with gender + type params
    await expect(page).toHaveURL(/gender=female.*type=freshman|type=freshman.*gender=female/);
    // At least one eligible card should remain visible
    const cards = page.locator('a[href^="/dorms/"]');
    await expect(cards.first()).toBeVisible();
  });
});

test.describe('Dorm detail pages', () => {
  // Test all 6 dorm detail pages to ensure ISR pre-render works
  for (const dormId of DORM_IDS) {
    test(`/dorms/${dormId} loads and shows content`, async ({ page }) => {
      await page.goto(`/dorms/${dormId}`);

      // Dorm name heading must be visible
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText?.length).toBeGreaterThan(2);

      // OfficialDataBadge must be in the sticky header
      await expect(page.locator('text=/공식|2026/')).toBeVisible();

      // Official disclaimer must be present
      await expect(
        page.locator('text=/공식 기준|입주 선발/')
      ).toBeVisible();

      // Back button must navigate to /dorms
      await page.getByRole('link', { name: /기숙사 목록/ }).click();
      await expect(page).toHaveURL(/\/dorms/);
    });
  }

  test('dorm detail OG meta title includes dorm name', async ({ page }) => {
    await page.goto('/dorms/yongji');
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute('content');
    expect(ogTitle).toMatch(/용지/);
  });

  test('non-existent dorm returns 404 page', async ({ page }) => {
    const response = await page.goto('/dorms/does-not-exist');
    // Next.js notFound() returns 404
    expect(response?.status()).toBe(404);
    await expect(page.locator('text=/404|\uc5c6|\uc0ac/')).toBeVisible();
  });
});
