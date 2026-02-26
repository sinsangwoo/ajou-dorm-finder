/**
 * tests/e2e/home.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Home page smoke tests.
 * Verifies landing page content, navigation, and basic SEO output.
 */

import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Content ──────────────────────────────────────────────────────────────────────

  test('renders page title in <head>', async ({ page }) => {
    await expect(page).toHaveTitle(/아주대/);
  });

  test('navbar is visible with correct links', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: '오나 기숙사' })).toBeVisible();
    await expect(page.getByRole('link', { name: '점수 계산기' })).toBeVisible();
  });

  test('hero section headline is visible', async ({ page }) => {
    // The hero contains '긱사' or '기숙사' somewhere prominent
    const heroHeadline = page.getByRole('heading', { level: 1 }).first();
    await expect(heroHeadline).toBeVisible();
    await expect(heroHeadline).toContainText(/깃사|기숙사|아주/);
  });

  test('OG meta tags exist for SNS sharing', async ({ page }) => {
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDesc  = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogDesc).toBeTruthy();
    expect(ogTitle).toMatch(/아주/);
  });

  // ── Navigation ──────────────────────────────────────────────────────────────────

  test('clicking 기숙사 nav link goes to /dorms', async ({ page }) => {
    await page.getByRole('link', { name: '기숙사' }).first().click();
    await page.waitForURL('**/dorms');
    await expect(page).toHaveURL(/\/dorms/);
  });

  test('clicking 점수 계산기 nav link goes to /calculator', async ({ page }) => {
    await page.getByRole('link', { name: '점수 계산기' }).first().click();
    await page.waitForURL('**/calculator');
    await expect(page).toHaveURL(/\/calculator/);
  });

  // ── Performance signal ──────────────────────────────────────────────────────

  test('hero paint is visible before JS hydration (LCP signal)', async ({ page }) => {
    // Block all scripts, load page — hero must still be visible (SSR)
    await page.route('**/*.js', (route) => route.abort());
    await page.goto('/');
    const heading = page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toBeVisible({ timeout: 5000 });
  });
});
