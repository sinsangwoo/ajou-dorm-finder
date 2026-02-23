/**
 * tests/e2e/core-flow.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * PRIMARY HAPPY PATH — the single most important test in the entire suite.
 *
 * SCENARIO: 신입생 아주대생이 처음 방문해 점수를 계산하고 기숙사를 확인한다.
 *
 *   1. 홈 페이지 진입
 *   2. 네비게이션으로 점수 계산기 이동
 *   3. 계산기에서 항목을 조작
 *   4. 결과(점수) 확인
 *   5. 기숙사 목록으로 이동
 *   6. 특정 기숙사 상세 페이지 진입
 *   7. 공식 데이터 배지와 disclaimer 확인
 *   8. 뒤로 가기로 목록 복귀
 *
 * This test runs sequentially within a single page context
 * to simulate a real browsing session.
 */

import { test, expect } from '@playwright/test';

test('CORE FLOW: home → calculator → score → dorms → detail → back', async ({ page }) => {
  // ── Step 1: Home page ─────────────────────────────────────────────────────────
  await page.goto('/');
  await expect(page).toHaveTitle(/아주/);
  // Hero should render before any JS (SSR check)
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

  // ── Step 2: Navigate to calculator ──────────────────────────────────────────
  await page.getByRole('link', { name: '점수 계산기' }).first().click();
  await page.waitForURL('**/calculator');
  await expect(page.getByRole('heading', { name: /점수/ })).toBeVisible();

  // ── Step 3: Calculator interaction ─────────────────────────────────────────
  // Try to interact with a slider (GPA or distance) if available
  const sliders = page.getByRole('slider');
  const sliderCount = await sliders.count();
  if (sliderCount > 0) {
    // Move first slider right by pressing ArrowRight 3 times
    await sliders.first().focus();
    await sliders.first().press('ArrowRight');
    await sliders.first().press('ArrowRight');
    await sliders.first().press('ArrowRight');
  }

  // ── Step 4: Score is displayed ────────────────────────────────────────────
  // Wait for any numeric element that looks like a score
  const scoreNum = page.locator('text=/^\d{1,2}(\.\d)?\.?\d*$/');
  await expect(scoreNum.first()).toBeVisible({ timeout: 8000 });

  // OfficialDataBadge must be on calculator page
  await expect(page.locator('text=/공식|2026/')).toBeVisible();

  // ── Step 5: Navigate to dorms listing ─────────────────────────────────────
  await page.getByRole('link', { name: '기숙사' }).first().click();
  await page.waitForURL('**/dorms');
  await expect(page.getByRole('heading', { name: /기숙사/ })).toBeVisible();

  // All 6 dorm cards should be visible
  const cards = page.locator('a[href^="/dorms/"]');
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(6);

  // ── Step 6: Click into a dorm detail (first card) ───────────────────────
  await cards.first().click();
  await page.waitForURL(/\/dorms\/.+/);

  // Detail heading should be visible
  const detailHeading = page.getByRole('heading', { level: 1 });
  await expect(detailHeading).toBeVisible();

  // ── Step 7: Official badge + disclaimer ─────────────────────────────────
  await expect(page.locator('text=/공식|2026/')).toBeVisible();
  await page.keyboard.press('End');
  await expect(
    page.locator('text=/공식 기준|입주 선발|officialCriteria/')
      .first()
  ).toBeVisible({ timeout: 5000 });

  // ── Step 8: Navigate back to dorms list ────────────────────────────────
  await page.getByRole('link', { name: /기숙사 목록/ }).click();
  await page.waitForURL(/\/dorms$/);
  await expect(page).toHaveURL(/\/dorms$/);
});

// ── Dark mode persistence ────────────────────────────────────────────────────────────
test('dark mode toggle persists across navigation', async ({ page }) => {
  await page.goto('/');

  // Toggle to dark mode
  const toggle = page.getByRole('button', { name: /테마 전환/ }).first();
  await toggle.click();

  // Navigate away and back
  await page.getByRole('link', { name: '기숙사' }).first().click();
  await page.waitForURL('**/dorms');
  await page.goBack();
  await page.waitForURL('/');

  // The html element should still have 'dark' class (next-themes)
  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toContain('dark');
});
