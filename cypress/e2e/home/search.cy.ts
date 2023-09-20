import { MAX_RESULTS_TO_SHOW } from '../../../src/config/constants';
import { ALL_COLLECTIONS_ROUTE, HOME_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  HOME_SEARCH_ID,
  SEARCH_RESULTS_LIST_ID,
  SEARCH_RESULTS_SHOW_MORE_BUTTON,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';

// the text doesn't affect the result: results are set in setUpApi
const keywords = 'keywords';

describe('Search', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Fetch results for ${environment.currentMember?.name}`, () => {
      it(`Show more than ${MAX_RESULTS_TO_SHOW} results at home`, () => {
        cy.setUpApi(environment);
        cy.visit(HOME_ROUTE);

        cy.get(`#${HOME_SEARCH_ID}`).type(keywords);

        // verify result items are displayed
        // only part of the results are displayed
        // eslint-disable-next-line no-restricted-syntax
        for (const item of PUBLISHED_ITEMS.slice(
          0,
          -(PUBLISHED_ITEMS.length - MAX_RESULTS_TO_SHOW),
        )) {
          cy.get(`#${SEARCH_RESULTS_LIST_ID}`).contains(item.name);
        }

        cy.get(`#${SEARCH_RESULTS_SHOW_MORE_BUTTON}`)
          .should('be.visible')
          .click();

        cy.get(`#${ALL_COLLECTIONS_GRID_ID}`).should('be.visible');

        cy.get(`#${HOME_SEARCH_ID}`).should('have.value', keywords);
      });

      it(`Search with correct parameters in all collections`, () => {
        cy.setUpApi(environment);
        cy.visit(ALL_COLLECTIONS_ROUTE);

        // verify all items are displayed
        // eslint-disable-next-line no-restricted-syntax
        for (const item of PUBLISHED_ITEMS) {
          cy.get(`#${ALL_COLLECTIONS_GRID_ID}`).contains(item.name);
        }

        cy.get(`#${HOME_SEARCH_ID}`).type(keywords);

        cy.wait(['@search', '@search']).then(
          ([
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _first,
            {
              request: { body },
            },
          ]) => {
            expect(body.queries[0].q).to.eq(keywords);
          },
        );

        // todo: toggle categories
      });

      // todo: load more
    });
  });
});
