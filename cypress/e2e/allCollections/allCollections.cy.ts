import { CategoryType } from '@graasp/sdk';
import { namespaces } from '@graasp/translations';

import { i18nConfig } from '../../../src/config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  ALL_COLLECTIONS_TITLE_ID,
  ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID,
  buildCategoryOptionSelector,
  buildCollectionCardGridId,
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../../src/config/selectors';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { getRootPublishedItems } from '../../support/utils';

const i18n = i18nConfig();

buildPublicAndPrivateEnvironments(PUBLISHED_ITEMS).forEach((environment) => {
  describe(`All Collections Page for ${
    environment.currentMember?.name ?? 'signed out user'
  }`, () => {
    // check if title and headings are displayed correctly
    beforeEach(() => {
      cy.setUpApi(environment);
      if (environment.currentMember?.extra.lang) {
        i18n.changeLanguage(environment.currentMember.extra.lang);
      }

      cy.visit(ALL_COLLECTIONS_ROUTE);
    });

    it('Layout', () => {
      cy.get(`#${ALL_COLLECTIONS_TITLE_ID}`).should('be.visible');

      // filter header
      cy.get(`#${buildSearchFilterCategoryId(CategoryType.Level)}`).should(
        'contain.text',
        i18n.t(CategoryType.Level, { ns: namespaces.categories }),
      );
      cy.get(`#${buildSearchFilterCategoryId(CategoryType.Discipline)}`).should(
        'contain.text',
        i18n.t(CategoryType.Discipline, { ns: namespaces.categories }),
      );
      cy.get(`#${buildSearchFilterCategoryId(CategoryType.Language)}`).should(
        'contain.text',
        i18n.t(CategoryType.Language, { ns: namespaces.categories }),
      );
      // todo: add back when license filtering is enabled
      // cy.get(`#${buildSearchFilterCategoryId(CATEGORY_TYPES.LICENSE)}`).should(
      //   'contain.text',
      //   // todo: add translations
      //   // i18n.t(CATEGORIES.EDUCATION_LEVEL, { ns: namespaces.categories }),
      //   'License',
      // );

      // verify 2 item cards are displayed (without children)
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      cy.get(`[id^=${buildCollectionCardGridId('')}]`).should(
        'have.length',
        getRootPublishedItems(environment.items).length,
      );

      // verify 6 item cards are displayed (including children)
      cy.get(`#${ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID}`).check();
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      cy.get(`[id^=${buildCollectionCardGridId('')}]`).should(
        'have.length',
        environment.items.length,
      );
    });

    it('display menu options', () => {
      cy.wait(['@getCategories']);
      [
        CategoryType.Level,
        CategoryType.Discipline,
        CategoryType.Language,
      ].forEach((categoryType) => {
        cy.get(
          `#not-sticky button#${buildSearchFilterPopperButtonId(categoryType)}`,
        )
          .filter(':visible')
          .click();
        // cy.scrollTo('top');
        const categories = SAMPLE_CATEGORIES.filter(
          (c) => c.type === categoryType,
        );
        categories.forEach((cat, idx) => {
          cy.get(buildCategoryOptionSelector(idx)).contains(cat.name);
          // bug: category pop up does not open
          // .and('be.visible');
        });
      });
    });

    it.skip('scroll to bottom and search should pop out', () => {
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);

      cy.scrollTo('bottom');

      cy.get(`#${buildSearchFilterPopperButtonId(CategoryType.Level)}`).click();
      cy.get(`#${buildSearchFilterCategoryId(CategoryType.Level)}`).should(
        'be.visible',
      );
    });

    it('select/unselect categories', () => {
      // search allows to get all the published items
      cy.wait(['@getCategories', '@search']);
      // cy.scrollTo('top');
      cy.get(
        `#not-sticky button#${buildSearchFilterPopperButtonId(
          CategoryType.Level,
        )}`,
      ).click();
      cy.get(buildCategoryOptionSelector(0)).click();
      cy.wait('@search').then(() => {
        cy.get(`#${ALL_COLLECTIONS_GRID_ID}`)
          .children()
          .should('have.length', getRootPublishedItems(PUBLISHED_ITEMS).length);
      });

      // bug: popup does not open in cypress
      // clear selection
      // cy.get(`#${CLEAR_FILTER_POPPER_BUTTON_ID}`).click();

      // check default display, show all published with children
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`)
        .children()
        .should('have.length', getRootPublishedItems(PUBLISHED_ITEMS).length);
    });
  });
});
