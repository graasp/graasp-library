import { type Locator, type Page, expect, test } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('Query', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Search among 958' }),
    ).toBeVisible();
    await page
      .getByRole('textbox', { name: 'Search collections…' })
      .fill('Geogebra');

    await page.waitForURL('**/search?**s=Geogebra**');
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('s') === 'Geogebra',
    );
  });

  test('Languages', async ({ page }) => {
    await checkFilter(
      page,
      { name: 'Languages' },
      { label: 'Español', value: 'es' },
      'langs',
    );
  });
  test('Disciplines', async ({ page }) => {
    await checkFilter(
      page,
      { name: 'Disciplines' },
      { label: 'Maths', value: 'Maths' },
      'disciplines',
    );
  });
  test('Levels', async ({ page }) => {
    await checkFilter(
      page,
      { name: 'Levels' },
      { label: 'Lycee', value: 'Lycee' },
      'levels',
    );
  });
  test('Resource Types', async ({ page }) => {
    await checkFilter(
      page,
      { name: 'Resource Types' },
      { label: 'Exercises', value: 'Exercises' },
      'resourceTypes',
    );
  });

  test('In depth search', async ({ page }) => {
    // enable in depth search
    await page.getByText('Enable in-depth Search', { exact: true }).click();
    // check the url contains rootOnly=false
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('rootOnly') === 'false',
    );
  });
});

async function clearSelection(page: Page, popperLocator: Locator) {
  const isButtonVisible = await page
    .getByRole('button', { name: 'Clear' })
    .isVisible();
  if (!isButtonVisible) {
    await popperLocator.click();
  }
  const locator = page.getByRole('button', { name: 'Clear' });
  // Wait for the element to be visible and attached
  await locator.waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Clear' }).click();
}

async function checkFilter(
  page: Page,
  { name }: { name: string },
  selection: { label: string; value: string },
  queryParamKey: string,
) {
  // open languages filter
  await page.getByRole('combobox', { name }).click();

  // select a language
  const locator = page.getByText(selection.label);
  await locator.waitFor({ state: 'visible' });
  await page.getByText(selection.label).click();

  // open the dialog back if it closed
  if (
    !(await page.getByRole('checkbox', { name: selection.label }).isVisible())
  ) {
    await page.getByRole('combobox', { name }).click();
  }
  await expect(
    page.getByRole('checkbox', { name: selection.label }),
  ).toBeChecked();

  const filledUrl = (url: URL) =>
    url.searchParams.get(queryParamKey) === `["${selection.value}"]`;
  await page.waitForURL(filledUrl);
  await expect(page).toHaveURL(filledUrl);

  // clear the languages
  await clearSelection(page, page.getByRole('combobox', { name }));

  const emptyUrl = (url: URL) => url.searchParams.get(queryParamKey) === '[]';
  await page.waitForURL(emptyUrl);
  await expect(page).toHaveURL(emptyUrl);
}
