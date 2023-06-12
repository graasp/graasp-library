import { CATEGORIES, LIBRARY, namespaces } from '@graasp/translations';

import { CATEGORY_TYPES } from '../../../src/config/constants';
import i18n from '../../../src/config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  ALL_COLLECTIONS_HEADER_ID,
  ALL_COLLECTIONS_TITLE_ID,
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  buildCategoryOptionSelector,
  buildCollectionCardGridId,
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../../src/config/selectors';
import {
  SAMPLE_CATEGORIES,
  SAMPLE_CATEGORY_TYPES,
} from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { getRootPublishedItems } from '../../support/utils';

buildPublicAndPrivateEnvironments(PUBLISHED_ITEMS).forEach((environment) => {
  describe(`All Collections Page for ${environment.currentMember.name}`, () => {
    // check if title and headings are displayed correctly
    beforeEach(() => {
      cy.setUpApi(environment);
      if (environment.currentMember?.extra?.lang) {
        i18n.changeLanguage(environment.currentMember?.extra?.lang);
      }
      cy.visit(ALL_COLLECTIONS_ROUTE);
    });

    it('Layout', () => {
      cy.get(`#${ALL_COLLECTIONS_HEADER_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.ALL_COLLECTIONS_TITLE),
      );

      cy.get(`#${ALL_COLLECTIONS_TITLE_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.SEARCH_PAGE_TITLE),
      );

      // filter header
      cy.get(`#${buildSearchFilterCategoryId(CATEGORY_TYPES.LEVEL)}`).should(
        'contain.text',
        i18n.t(CATEGORIES.EDUCATION_LEVEL, { ns: namespaces.categories }),
      );
      cy.get(
        `#${buildSearchFilterCategoryId(CATEGORY_TYPES.DISCIPLINE)}`,
      ).should(
        'contain.text',
        i18n.t(CATEGORIES.DISCIPLINE, { ns: namespaces.categories }),
      );
      cy.get(`#${buildSearchFilterCategoryId(CATEGORY_TYPES.LANGUAGE)}`).should(
        'contain.text',
        i18n.t(CATEGORIES.LANGUAGE, { ns: namespaces.categories }),
      );
      cy.get(`#${buildSearchFilterCategoryId(CATEGORY_TYPES.LICENSE)}`).should(
        'contain.text',
        // todo: add translations
        // i18n.t(CATEGORIES.EDUCATION_LEVEL, { ns: namespaces.categories }),
        'License',
      );

      // verify 2 item cards are displayed
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      cy.get(`[id^=${buildCollectionCardGridId('')}]`).should(
        'have.length',
        getRootPublishedItems(environment.items).length,
      );
    });

    // todo: enable when search is implemented
    it.skip('display menu options', () => {
      cy.wait(['@getCategories', '@getCategoryTypes']);
      cy.scrollTo('top');
      SAMPLE_CATEGORY_TYPES.forEach(({ name, id }) => {
        cy.get(`#not-sticky button#${buildSearchFilterPopperButtonId(name)}`)
          .filter(':visible')
          .click()
          .click();
        const categories = SAMPLE_CATEGORIES.filter((c) => c.type === id);
        categories.forEach((cat, idx) =>
          cy
            .get(buildCategoryOptionSelector(idx))
            .should('have.text', cat.name)
            .and('be.visible'),
        );
      });
    });

    it('scroll to bottom and search should pop out', () => {
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);

      cy.scrollTo('bottom');

      cy.get(
        `#${buildSearchFilterPopperButtonId(CATEGORY_TYPES.LEVEL)}`,
      ).click();
      cy.get(`#${buildSearchFilterCategoryId(CATEGORY_TYPES.LEVEL)}`).should(
        'be.visible',
      );
    });

    // todo: enable when search is implemented
    it.skip('select/unselect categories', () => {
      // const selectCategoryButton = cy.get(buildEducationLevelOptionSelector(0));
      // selectCategoryButton.click();
      cy.wait('@getPublishedItemsInCategories').then(
        ({ response: { body } }) => {
          cy.get(`#${ALL_COLLECTIONS_GRID_ID}`)
            .children()
            .should('have.length', body.length);
        },
      );

      // clear selection
      cy.get(`#${CLEAR_EDUCATION_LEVEL_SELECTION_ID}`).click();

      // check default display
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`)
        .children()
        .should('have.length', getRootPublishedItems(PUBLISHED_ITEMS).length);
    });
  });
});
