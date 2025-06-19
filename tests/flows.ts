import { expect, test } from '@playwright/test';

test('Search flow', async ({ page }) => {
  await page.goto('/');

  // check title and subtitle are displayed
  await expect(page.locator('#homeTitle')).toContainText('Graasp Library');
  await expect(page.locator('h2')).toContainText(
    'Browse and Discover Open Educational Resources',
  );

  // navigate to search page
  await page.getByRole('link', { name: 'Browse All Collections' }).click();

  // expect title of the page
  await expect(
    page.getByRole('heading', { name: 'Search among' }),
  ).toContainText('Search among 958 resources');

  const geogebraLocator = page.locator('a').filter({ hasText: 'Geogebra' });
  // expect first collection to have card title text
  await expect(geogebraLocator).toBeVisible();

  // navigate to collection page
  await geogebraLocator.click();

  // expect collection title to be displayed
  await expect(page.locator('#summaryTitle')).toContainText('Geogebra');

  // go back
  await page.getByRole('button', { name: 'Back' }).click();

  await page.waitForTimeout(3000);
  // filter by language
  await page.locator('#searchFilterButton-lang').click();
  await page.getByRole('checkbox', { name: 'Español' }).click();
  await expect(page).toHaveURL((url) => {
    const params = url.searchParams;
    return params.has('langs') && params.get('langs') === '["es"]';
  });

  await expect(
    page.getByRole('heading', { name: 'Search among' }),
  ).toContainText('Search among 958 resources');

  await expect(
    page.getByRole('heading', { name: 'Proyecto periódico escolar' }),
  ).toBeVisible();
});

test('Like a collection', async ({ page }) => {
  // got to the collection page
  await page.goto('/collections/47238afb-5e21-4cf8-b2b1-5904af82a155');

  // check collection is correct
  await expect(page.getByRole('heading', { name: 'Geogebra' })).toBeVisible();

  // like the collection
  await page.getByRole('button', { name: 'like' }).click();
});
