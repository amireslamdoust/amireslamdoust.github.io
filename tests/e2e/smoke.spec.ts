import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('portfolio smoke', () => {
  test('home exposes recruiter path', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Amir Eslamdoust',
    );
    await expect(page.getByRole('link', { name: 'Email' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View CV' }).first()).toBeVisible();
  });

  test('case study pages render', async ({ page }) => {
    await page.goto('/work/shared-frontend-platform');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.goto('/work/ai-agent-tooling');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('home has no serious axe violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    const serious = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? ''),
    );
    expect(serious).toEqual([]);
  });
});
