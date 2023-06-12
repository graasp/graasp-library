import { HOME_ROUTE } from '../../../src/config/routes';
import {
  HOME_SEARCH_BUTTON_ID,
  HOME_SEARCH_ID,
  SEARCH_RESULTS_GRID_ID,
  buildSearchRangeOptionId,
} from '../../../src/config/selectors';
import { SEARCH_RANGES } from '../../../src/enums/searchRanges';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';

const search = (text, range) => {
  cy.get(`#${HOME_SEARCH_ID}`).type(text);
  cy.get(`#${buildSearchRangeOptionId(range.value)}`).click();
  cy.get(`#${HOME_SEARCH_BUTTON_ID}`).click();
};

// the text doesn't affect the result: results are set in setUpApi
const keywords = 'keywords';
const searchResultItems = PUBLISHED_ITEMS.slice(2);

// todo: enable back when search is implemented
describe.skip('Search', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Fetch results for ${environment.currentMember.name}`, () => {
      Object.values(SEARCH_RANGES).forEach((range) => {
        it(range.title, () => {
          cy.setUpApi({ ...environment, searchResultItems });
          cy.visit(HOME_ROUTE);

          search(keywords, range);

          // verify result items are displayed
          cy.wait('@search').then(({ request: { url } }) => {
            expect(url).to.contain(range.value);
            expect(url).to.contain(keywords);
            cy.get(`#${SEARCH_RESULTS_GRID_ID}`)
              .children()
              .should('have.length', searchResultItems.length);
          });
        });
      });
    });
  });
});
