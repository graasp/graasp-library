import { MY_LIST_ROUTE } from '../../../src/config/routes';
import {
  MY_LIKES_COLLECTIONS_ID,
  buildMyListNavigationTabId,
} from '../../../src/config/selectors';
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

      cy.wait('@getLikedItemsForMember').then(({ response }) => {
        cy.get(`#${MY_LIKES_COLLECTIONS_ID}`)
          .children()
          .should('have.length', response?.body.length);
      });
    });
  });
});
