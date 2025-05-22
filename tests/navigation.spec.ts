import { expect, test } from '@playwright/test';

test.use({
  serviceWorkers: 'block',
});

test('test', async ({ page }) => {
  await page.routeFromHAR('./tests/fixtures/api_mock.har', {
    url: 'http://localhost:3000/**',
  });

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
  ).toContainText('Search among more than 9 resources');

  // expect first collection to have card title text
  await expect(page.getByRole('link', { name: 'App tests' })).toBeVisible();

  // navigate to collection page
  await page.getByRole('link', { name: 'App tests' }).click();

  // expect collection title to be displayed
  await expect(page.locator('#summaryTitle')).toContainText('App tests');

  // go back
  await page.getByRole('button', { name: 'Back' }).click();
  // filter by language
  await page.locator('#searchFilterButton-lang').click();
  await page.getByRole('checkbox', { name: 'Español' }).click();
  await expect(page).toHaveURL((url) => {
    const params = url.searchParams;
    return params.has('langs') && params.get('langs') === '["es"]';
  });

  await expect(
    page.getByRole('heading', { name: 'Search among' }),
  ).toContainText('Search among 1 resource');

  await expect(
    page.getByRole('link', { name: 'dsnfadsnfgmasdfg (3)' }),
  ).toBeVisible();
});
