import { HOME_ROUTE } from '../../../src/config/routes';
import {
  HOME_SEARCH_BUTTON_ID,
  HOME_SEARCH_ID,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';

const search = (text: string) => {
  cy.get(`#${HOME_SEARCH_ID}`).type(text);
  cy.get(`#${HOME_SEARCH_BUTTON_ID}`).click();
};

// the text doesn't affect the result: results are set in setUpApi
const keywords = 'keywords';
const searchResultItems = PUBLISHED_ITEMS.slice(2);

// todo: enable back when search is implemented
describe.skip('Search', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Fetch results for ${environment.currentMember?.name}`, () => {
      it('title and description', () => {
        cy.setUpApi({ ...environment, searchResultItems });
        cy.visit(HOME_ROUTE);

        search(keywords);
        // this is a frontend search currently

        // verify result items are displayed
        // cy.wait('@search').then(({ request: { url } }) => {
        //   expect(url).to.contain(keywords);
        //   cy.get(`#${SEARCH_RESULTS_GRID_ID}`)
        //     .children()
        //     .should('have.length', searchResultItems.length);
        // });
      });
    });
  });
});
