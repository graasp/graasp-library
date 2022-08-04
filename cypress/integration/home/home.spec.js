import { HOME_ROUTE } from '../../../src/config/routes';
import {
  COLLECTIONS_GRID_ID,
  DISCOVER_SECTION_TITLE_ID,
  GRAASP_SELECTION_TITLE_ID,
  TITLE_TEXT_ID,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { GRAASPER_ITEMS, PUBLISHED_ITEMS } from '../../fixtures/items';
import { getRootPublishedItems } from '../../support/utils';

describe('Home Page', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Home Layout for ${environment.currentMember.name}`, () => {
      // check if title and headings are displayed correctly
      it('display headings & collections', () => {
        cy.setUpApi(environment);
        cy.visit(HOME_ROUTE);

        cy.get(`#${TITLE_TEXT_ID}`).should('be.visible');
        cy.get(`#${DISCOVER_SECTION_TITLE_ID}`)
          .last()
          .should('have.text', 'Discover');

        // verify item cards are displayed
        cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
          expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
          cy.get(`#${COLLECTIONS_GRID_ID}`)
            .children()
            .should(
              'have.length',
              getRootPublishedItems(PUBLISHED_ITEMS).length,
            );
        });
      });

      describe('Graasper items', () => {
        it('No graasper items to show', () => {
          cy.setUpApi(environment);
          cy.visit(HOME_ROUTE);

          // section should not be displayed
          cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
            expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
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

              cy.get(`#${COLLECTIONS_GRID_ID}`)
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
