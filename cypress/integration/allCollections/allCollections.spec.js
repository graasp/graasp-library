import { LIBRARY } from '@graasp/translations';

import i18n from '../../../src/config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  CLOSE_MENU_BUTTON_ID,
  OPEN_MENU_BUTTON_ID,
  SIDEMENU_HEADING_ID,
  SUBTITLE_TEXT_ID,
  TITLE_TEXT_ID,
  buildEducationLevelOptionSelector,
} from '../../../src/config/selectors';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { getRootPublishedItems } from '../../support/utils';

const beforeEach = (environment) => {
  cy.setUpApi(environment);
  cy.visit(ALL_COLLECTIONS_ROUTE);
};

buildPublicAndPrivateEnvironments(PUBLISHED_ITEMS).forEach((environment) => {
  describe(`All Collections Page for ${environment.currentMember.name}`, () => {
    // check if title and headings are displayed correctly
    it('Layout', () => {
      beforeEach(environment);

      cy.get(`#${TITLE_TEXT_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.ALL_COLLECTIONS_TITLE),
      );

      cy.get(`#${SUBTITLE_TEXT_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.COLLECTIONS_COUNT_MESSAGE, {
          count: getRootPublishedItems(PUBLISHED_ITEMS).length,
        }),
      );

      // side menu heading
      cy.get(`#${SIDEMENU_HEADING_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.ALL_COLLECTIONS_CATEGORIES_TITLE),
      );

      // verify 5 item cards are displayed
      const itemGrids = cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      itemGrids
        .children()
        .should('have.length', getRootPublishedItems(PUBLISHED_ITEMS).length);
    });

    it('display menu options', () => {
      beforeEach(environment);

      cy.get(buildEducationLevelOptionSelector(0)).should(
        'have.text',
        SAMPLE_CATEGORIES[0].name,
      );
    });

    it('close side menu and reopen', () => {
      beforeEach(environment);
      cy.get(`#${CLOSE_MENU_BUTTON_ID}`).click();
      cy.get(`#${SIDEMENU_HEADING_ID}`).should('not.be.visible');
      cy.get(`#${OPEN_MENU_BUTTON_ID}`).click();
      cy.get(`#${SIDEMENU_HEADING_ID}`).should(
        'have.text',
        i18n.t(LIBRARY.ALL_COLLECTIONS_CATEGORIES_TITLE),
      );
    });

    it('select/unselect categories', () => {
      beforeEach(environment);
      const selectCategoryButton = cy.get(buildEducationLevelOptionSelector(0));
      selectCategoryButton.click();
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
