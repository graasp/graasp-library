import { MY_LIST_ROUTE } from '../../../src/config/routes';
import {
  MY_PUBLISHMENTS_COLLECTIONS_ID,
  buildMyListNavigationTabId,
} from '../../../src/config/selectors';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import {
  PUBLISHED_ITEMS,
  getNumberOfOwnPublishedItems,
} from '../../fixtures/items';
import { CURRENT_USER } from '../../fixtures/members';

describe('My Published Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display published items', () => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      cy.visit(MY_LIST_ROUTE);

      // click my publishment tab
      cy.get(`#${buildMyListNavigationTabId('myPublishments')}`).click();

      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.get(`#${MY_PUBLISHMENTS_COLLECTIONS_ID}`)
        .children()
        .should('have.length', getNumberOfOwnPublishedItems(CURRENT_USER.id));
    });
  });
});
