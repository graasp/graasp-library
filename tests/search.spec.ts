import { expect, test } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('Filters', async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'Search collections…' })
      .fill('Geogebra');

    await expect(page).toHaveURL(
      (url) => url.searchParams.get('s') === 'Geogebra',
    );

    // open languages filter
    await page.getByRole('combobox', { name: 'No language filter…' }).click();
    // select a language
    await page.getByText('Español').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('langs') === '["es"]',
    );
    // clear the languages
    await page.getByRole('button', { name: 'Clear' }).click();
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('langs') === '[]',
    );

    // open disciplines filter
    await page.getByRole('combobox', { name: 'No discipline filter…' }).click();
    // select a discipline
    await page.getByText('Maths').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('disciplines') === '["Maths"]',
    );
    // clear the disciplines
    await page.getByRole('button', { name: 'Clear' }).click();
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('disciplines') === '[]',
    );

    // open levels filter
    await page.getByRole('combobox', { name: 'No level filter…' }).click();
    // select a level
    await page.getByText('Lycee').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('levels') === '["Lycee"]',
    );
    // clear the levels
    await page.getByRole('button', { name: 'Clear' }).click();
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('levels') === '[]',
    );

    // open resourceTypes filter
    await page.getByRole('combobox', { name: 'No type filter…' }).click();
    // select a resourceType
    await page.getByText('Exercises').click();
    // check it is saved in url
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('resourceTypes') === '["Exercises"]',
    );
    // clear the resourceTypes
    await page.getByRole('button', { name: 'Clear' }).click();
    // check the url is clean
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('resourceTypes') === '[]',
    );
    // close the poper
    await page.getByText('Found ').click();

    // enable in depth search
    await page.getByText('Enable in-depth Search').click();
    // check the url contains rootOnly=false
    await expect(page).toHaveURL(
      (url) => url.searchParams.get('rootOnly') === 'false',
    );
  });
});
