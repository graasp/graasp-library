import { CategoryType } from '@graasp/sdk';
import { langs, namespaces } from '@graasp/translations';

import { LIBRARY_NAMESPACE, i18nConfig } from '../../../src/config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  ALL_COLLECTIONS_TITLE_ID,
  ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID,
  SEARCH_FILTER_LANG_ID,
  SEARCH_FILTER_POPPER_LANG_ID,
  buildCategoryOptionSelector,
  buildCollectionCardGridId,
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../../src/config/selectors';
import LIBRARY from '../../../src/langs/constants';
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
      cy.get(`#${SEARCH_FILTER_LANG_ID}`).should(
        'contain.text',
        i18n.t(LIBRARY.SEARCH_FILTER_LANG_TITLE, { ns: LIBRARY_NAMESPACE }),
      );

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

    it('display language options', () => {
      cy.wait(['@getCategories']);
      cy.get(`#not-sticky button#${SEARCH_FILTER_POPPER_LANG_ID}`)
        .filter(':visible')
        .click();
      Object.entries(langs).forEach((l, idx) => {
        cy.get(buildCategoryOptionSelector(idx)).contains(l[1]);
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
