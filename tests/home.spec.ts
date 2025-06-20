import { expect, test } from '@playwright/test';

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Header', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Graasp', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Library', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Search', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'OER', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('banner').getByRole('button', { name: 'language switch' }),
    ).toBeVisible();
    // await expect(page.getByRole())
  });

  test('Language change', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'This fails in Safari');
    // wait for page to stabilise
    await page.waitForTimeout(3000);
    // change language
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'language switch' })
      .click();
    await page.getByRole('menuitem', { name: 'Français' }).click();

    await page.waitForTimeout(10000);
    // The title should have changed to display the french version
    await expect(
      page.getByRole('heading', { name: 'Bibliothèque Graasp' }),
    ).toBeVisible();

    // wait for page to stabilise
    await page.waitForTimeout(3000);
    // change language from footer
    await page
      .getByTestId('footer')
      .getByRole('button', { name: 'language switch' })
      .click();
    await page.getByRole('menuitem', { name: 'Español' }).click();

    await page.waitForTimeout(2000);
    // The title should have changed to display the spanish version
    await expect(
      page.getByRole('heading', { name: 'Biblioteca Graasp' }),
    ).toBeVisible();
  });

  test('Hero information', async ({ page }) => {
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
    const searchInput = page.getByRole('textbox', {
      name: 'Search collections…',
    });
    await searchInput.click();
    await page.waitForTimeout(4000);
    await searchInput.pressSequentially('geogebra', { delay: 500 });
    const geogebraResult = page
      .locator('#searchResultsList')
      .getByRole('link', { name: 'Geogebra Geogebra Interactive' })
      .first();
    await expect(geogebraResult).toBeVisible();
    await geogebraResult.click();

    await expect(page.locator('#summaryTitle')).toContainText('Geogebra');
    await page.getByRole('button', { name: 'Back' }).click();
  });

  test('Graasper collections', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Geogebra', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Templates', exact: true }),
    ).toBeVisible();
  });

  test('Footer', async ({ page }) => {
    await page.waitForTimeout(3000);
    // check browse all collections button
    await page.getByRole('link', { name: 'View more in the Library' }).click();
    await expect(page).toHaveURL((url) => url.pathname === '/search');
  });
});
