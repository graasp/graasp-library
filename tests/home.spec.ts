import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // load fixtures from HAR file
    await page.routeFromHAR('./tests/fixtures/home.har.zip', {
      url: 'http://localhost:3000/**',
      update: Boolean(process.env.UPDATE_HAR ?? false),
    });
    // navigate to home page
    await page.goto('/');
  });
  test('App Header', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Graasp' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Library', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Search', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'OER', exact: true }),
    ).toBeVisible();
  });
  test('Language Switcher', async ({ page }) => {
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'language switch' })
      .click();
    await page.getByRole('menuitem', { name: 'Français' }).click();

    // The title should have changed to display the french version
    await expect(
      page.getByRole('heading', { name: 'Bibliothèque Graasp' }),
    ).toBeVisible();
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
    const climateChip = page.getByTestId('popularSearches').getByRole('link', {
      name: 'Climate',
      exact: true,
    });
    await expect(climateChip).toBeVisible();

    // search for climate
    await climateChip.click();
    await expect(page).toHaveURL((url) => {
      const params = url.searchParams;
      return params.has('s') && params.get('s') === 'Climate';
    });

    // return to home page
    await page.getByRole('link', { name: 'Library', exact: true }).click();

    // check search button
    await page.getByRole('link', { name: 'Browse all collections' }).click();
    await expect(page).toHaveURL((url) => url.pathname === '/search');
  });

  test('Search Bar', async ({ page }) => {
    // this timeout is needed for the page to stabilize...
    // this is not recommended and we should try to avoid it at all costs but the way the component behaves currently does not make it possible to do otherwise
    await page.waitForTimeout(3000);
    const searchInput = page.getByRole('textbox', {
      name: 'Search collections…',
    });
    await searchInput.click();
    await searchInput.fill('geogebra');
    const geogebraResult = page
      .locator('#searchResultsList')
      .getByRole('link', { name: 'Geogebra Geogebra Interactive' })
      .first();
    await expect(geogebraResult).toBeVisible();
    await geogebraResult.click();

    await expect(page.locator('#summaryTitle')).toContainText('Geogebra');
    await page.getByRole('button', { name: 'Back' }).click();
  });
});
