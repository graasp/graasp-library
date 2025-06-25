import { type Locator, type Page, expect, test } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('Filters', async ({ page }) => {
    await page.waitForLoadState();
    await expect(
      page.getByRole('heading', { name: 'Search among 958' }),
    ).toBeVisible();
    await page
      .getByRole('textbox', { name: 'Search collections…' })
      .fill('Geogebra');

    await page.waitForLoadState();
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('s') === 'Geogebra',
    );

    // clear button selector

    // open languages filter
    const languageCombobox = page.getByRole('combobox', { name: 'Languages' });
    await languageCombobox.click();
    // select a language
    await page.getByText('Español').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('langs') === '["es"]',
    );
    // clear the languages
    await clearSelection(page, languageCombobox);
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('langs') === '[]',
    );

    // open disciplines filter
    const disciplineCombobox = page.getByRole('combobox', {
      name: 'Disciplines',
    });
    await disciplineCombobox.click();
    // select a discipline
    await page.getByText('Maths').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('disciplines') === '["Maths"]',
    );
    // clear the disciplines
    await clearSelection(page, disciplineCombobox);
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('disciplines') === '[]',
    );

    // open levels filter
    const levelsCombobox = page.getByRole('combobox', {
      name: 'Levels',
    });
    await levelsCombobox.click();
    // select a level
    await page.getByText('Lycee').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('levels') === '["Lycee"]',
    );
    // clear the levels
    await clearSelection(page, levelsCombobox);
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('levels') === '[]',
    );

    // open resourceTypes filter
    const resourceTypesCombobox = page.getByRole('combobox', {
      name: 'Resource Types',
    });
    await resourceTypesCombobox.click();
    // select a resourceType
    await page.getByText('Exercises').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('resourceTypes') === '["Exercises"]',
    );
    // clear the resourceTypes
    await clearSelection(page, resourceTypesCombobox);
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('resourceTypes') === '[]',
    );
    await resourceTypesCombobox.click();

    // close the popper
    await page.getByText('Found ').click();

    // enable in depth search
    await page.getByText('Enable in-depth Search', { exact: true }).click();
    // check the url contains rootOnly=false
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('rootOnly') === 'false',
    );
  });
});

async function clearSelection(page: Page, popperSelector: Locator) {
  const clearButton = page.getByRole('button', { name: 'Clear' });
  const isButtonVisible = await clearButton.isVisible();
  if (!isButtonVisible) {
    await popperSelector.click();
  }
  await page.getByRole('button', { name: 'Clear' }).click();
}
