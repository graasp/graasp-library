import { MY_LIST_ROUTE } from '../../../src/config/routes';
import {
  MY_LIKES_COLLECTIONS_ID,
  buildMyListNavigationTabId,
} from '../../../src/config/selectors';
import { ITEM_LIKES } from '../../fixtures/itemLikes';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { CURRENT_USER } from '../../fixtures/members';

describe('My Liked Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display liked items', () => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      cy.visit(MY_LIST_ROUTE);

      // click my likes tab
      cy.get(`#${buildMyListNavigationTabId('myLikes')}`).click();

      // liked items query both item-like table and published items
      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getLikedItems');
      cy.get(`#${MY_LIKES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', ITEM_LIKES.length);
    });
  });
});
