import { MY_LIST_ROUTE } from '../../../src/config/routes';
import {
  getNumberOfOwnPublishedItems,
  PUBLISHED_ITEMS,
} from '../../fixtures/items';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { CURRENT_USER } from '../../fixtures/members';
import {
  buildMyListNavigationTabId,
  MY_PUBLISHMENTS_COLLECTIONS_ID,
} from '../../../src/config/selectors';

describe('My Published Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display published items', () => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      cy.visit(MY_LIST_ROUTE);

      // click my publishment tab
      cy.get(
        `#${buildMyListNavigationTabId('myPublishments')}`,
      ).click();

      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.get(`#${MY_PUBLISHMENTS_COLLECTIONS_ID}`)
        .children()
        .should('have.length', getNumberOfOwnPublishedItems(CURRENT_USER.id));
    });
  });
});
