import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // load fixtures from HAR file
    await page.routeFromHAR('./tests/fixtures/api_mock.har', {
      url: 'http://localhost:3000/**',
    });
    // navigate to home page
    await page.goto('/');
  });

  test('Header information', async ({ page }) => {
    // title
    const title = page.getByRole('heading', {
      name: 'Graasp Library',
      exact: true,
    });
    await expect(title).toBeVisible();

    // subtitle
    const subtitle = page.getByRole('heading', {
      name: 'Browse and Discover',
    });
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText(
      'Browse and Discover Open Educational Resources',
    );

    // Popular searches
    await expect(
      page.getByRole('heading', { name: 'Popular Searches' }),
    ).toBeVisible();
    const climateChip = page.getByRole('link', { name: 'Climate' });
    await expect(climateChip).toBeVisible();

    // search for climate
    await climateChip.click();
    await expect(page).toHaveURL((url) => {
      const params = url.searchParams;
      return params.has('s') && params.get('s') === 'Climate';
    });
  });
});
