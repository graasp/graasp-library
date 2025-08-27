import { expect, test } from '@playwright/test';

const geogebraId = '47238afb-5e21-4cf8-b2b1-5904af82a155';
const CLIENT_HOST = process.env.VITE_CLIENT_HOST;

test('Search flow', async ({ page, browserName }) => {
  test.skip(
    browserName === 'webkit',
    'This test is very un-reliable in Safari',
  );
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

  // filter by language
  await page.getByRole('combobox', { name: 'Languages' }).click();
  await page.getByRole('checkbox', { name: 'Español' }).click();

  // page should "reload"
  await page.waitForLoadState();
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

test('All collections forwards search params', async ({ page }) => {
  await page.goto('/all-collections?s=geogebra');
  // url should be from search page and contain the search query
  await expect(page).toHaveURL((url) => {
    return (
      url.pathname === '/search' && url.searchParams.get('s') === 'geogebra'
    );
  });
});

test('Like a collection', async ({ page }) => {
  // got to the collection page
  await page.goto(`/collections/${geogebraId}`);

  // check collection is correct
  await expect(page.getByRole('heading', { name: 'Geogebra' })).toBeVisible();

  // like the collection
  const likePromise = page.waitForResponse(`**/items/${geogebraId}/like`);
  await page.getByRole('button', { name: 'like' }).click();
  // expect the page to get a response to the like action
  const _ = await likePromise;
});

test('Copy a collection embedding link', async ({ page, browserName }) => {
  test.skip(
    browserName === 'webkit',
    'Webkit does not allow checking the clipboard in tests',
  );
  // got to the collection page
  await page.goto(`/collections/${geogebraId}`);

  await page.getByRole('button', { name: 'More actions' }).click();
  await page.getByRole('menuitem', { name: 'Copy link' }).click();

  // Read clipboard content
  const embeddedLink = await page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });

  expect(embeddedLink).toBe(
    `${CLIENT_HOST}/player/${geogebraId}/${geogebraId}`,
  );
});

test('Play a collection', async ({ page, context, browserName }) => {
  test.skip(
    browserName === 'webkit',
    'Webkit does not handle opening the page in a new tab',
  );
  const playerPage = `${process.env.VITE_CLIENT_HOST}/player/${geogebraId}/${geogebraId}`;

  // mock the response to the player page
  await context.route(playerPage, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `
        <html>
          <head><title>Player page for Geogebra</title></head>
          <body>
            <h1>Hello from geogebra player page</h1>
          </body>
        </html>
      `,
    }),
  );
  // go to the collection page
  await page.goto(`/collections/${geogebraId}`);

  // check collection is correct
  await expect(page.getByRole('heading', { name: 'Geogebra' })).toBeVisible();

  // open the collection in a new tab
  const newTabPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Preview' }).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL(playerPage);
});

test('Copy a collection', async ({ page, context, browserName }) => {
  test.skip(
    browserName === 'webkit',
    'Webkit does not handle opening the page in a new tab',
  );
  const builderPage = `${process.env.VITE_CLIENT_HOST}/builder/items/${geogebraId}?copyOpen=true`;

  // mock the response to the builder page
  await context.route('**/builder/items/*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `
        <html>
          <head><title>Builder page for Geogebra</title></head>
          <body>
            <h1>Hello from geogebra builder page</h1>
          </body>
        </html>
      `,
    }),
  );
  // go to the collection page
  await page.goto(`/collections/${geogebraId}`);

  // check collection is correct
  await expect(page.getByRole('heading', { name: 'Geogebra' })).toBeVisible();

  // open the collection in builder when copy
  const newTabPromise = page.waitForEvent('popup');
  await page.getByLabel('More actions').click();
  await page.getByRole('menuitem', { name: 'Copy', exact: true }).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL(builderPage);
});
