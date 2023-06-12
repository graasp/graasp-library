import { LIBRARY } from '@graasp/translations';

import i18n from '../../../src/config/i18n';
import { HOME_ROUTE } from '../../../src/config/routes';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  HOME_PAGE_TITLE_TEXT_ID,
  MOST_LIKED_TITLE_ID,
  POPULAR_THIS_WEEK_TITLE_ID,
  SECTION_TITLE_ID,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { GRAASPER_ITEMS } from '../../fixtures/items';

describe('Home Page', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Home Layout for ${environment.currentMember.name}`, () => {
      // check if title and headings are displayed correctly
      it('display headings & collections', () => {
        cy.setUpApi(environment);
        if (environment.currentMember?.extra?.lang) {
          i18n.changeLanguage(environment.currentMember?.extra?.lang);
        }
        cy.visit(HOME_ROUTE);

        cy.get(`#${HOME_PAGE_TITLE_TEXT_ID}`)
          .should('be.visible')
          .and('have.text', 'Graasp');
        cy.get(`#${POPULAR_THIS_WEEK_TITLE_ID} #${SECTION_TITLE_ID}`).should(
          'have.text',
          i18n.t(LIBRARY.HOME_POPULAR_THIS_WEEK_COLLECTIONS_TITLE),
        );
        cy.get(`#${MOST_LIKED_TITLE_ID} #${SECTION_TITLE_ID}`).should(
          'have.text',
          i18n.t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE),
        );

        cy.get(`#${GRAASP_SELECTION_TITLE_ID} #${SECTION_TITLE_ID}`, {
          timeout: 4000,
        }).should('have.text', i18n.t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE));
      });

      describe('Graasper items', () => {
        it('No graasper items to show', () => {
          cy.setUpApi(environment);
          cy.visit(HOME_ROUTE);

          // section should not be displayed
          cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
            expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
            // todo: this succeeds because this element is not implemented anymore
            cy.get(`#${GRAASP_SELECTION_TITLE_ID}`).should('not.exist');
          });
        });
        it('Display graasper items', () => {
          const graasperEnvironment = JSON.parse(JSON.stringify(environment));
          graasperEnvironment.items = [
            ...GRAASPER_ITEMS,
            ...(graasperEnvironment.items ?? []),
          ];

          cy.setUpApi(graasperEnvironment);
          cy.visit(HOME_ROUTE);

          // verify graasper cards are displayed
          cy.wait('@getPublicItemsWithTags').then(
            ({ request: { url }, response: { body } }) => {
              expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
              cy.get(`#${GRAASP_SELECTION_TITLE_ID}`).should('be.visible');

              cy.get(`#${GRAASPER_COLLECTIONS_GRID_ID}`)
                .children()
                .should('have.length', body.length - 2);
              // We will change this later anyways so I just hardcode the number of Grassper items here
            },
          );
        });
      });
    });
  });
});
