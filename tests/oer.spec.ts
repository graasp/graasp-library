import { expect, test } from '@playwright/test';

test('OER Page', async ({ page }) => {
  await page.goto('/oer');
  await expect(
    page.getByRole('heading', { name: 'What are OERs?' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Basics and quality of work' }),
  ).toBeVisible();

  // sharing
  await expect(
    page.getByLabel('Share on Facebook').getByRole('link'),
  ).toBeVisible();
  await expect(
    page.getByLabel('Share on Twitter').getByRole('link'),
  ).toBeVisible();
  await expect(
    page.getByLabel('Share by email').getByRole('link'),
  ).toBeVisible();

  // the basics
  await expect(page.getByRole('heading', { name: 'The Basics' })).toBeVisible();
  await expect(page.getByText('Is your lesson preparation')).toBeVisible();

  // quality of materials
  await expect(
    page.getByRole('heading', { name: 'About the quality of materials' }),
  ).toBeVisible();
  await expect(page.getByText('So far, there is no quality')).toBeVisible();

  // discover more
  await expect(
    page.getByRole('link', { name: 'Discover published Open' }),
  ).toBeVisible();

  // more information
  await expect(
    page.getByRole('heading', { name: 'More Information' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'OER erklärt - die Grundlagen' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', {
      name: 'OER erklärt - über die Qualität der Materialien',
    }),
  ).toBeVisible();
});
