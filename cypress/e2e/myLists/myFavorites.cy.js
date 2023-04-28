import { MY_LIST_ROUTE } from '../../../src/config/routes';
import { MY_FAVORITES_COLLECTIONS_ID } from '../../../src/config/selectors';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildMemberWithFavorites } from '../../fixtures/members';

describe('My Favorite Items', () => {
  const favoriteItems = [PUBLISHED_ITEMS[0].id, PUBLISHED_ITEMS[3].id];
  describe('Current user', () => {
    it('display favorite items', () => {
      cy.setUpApi({
        currentMember: buildMemberWithFavorites(favoriteItems),
        items: PUBLISHED_ITEMS,
      });
      cy.visit(MY_LIST_ROUTE);

      // verify item cards are displayed
      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getCurrentMember');
      cy.get(`#${MY_FAVORITES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', favoriteItems.length);
    });
  });
  describe('Favorite items include non-existent items', () => {
    it('does not throw error', () => {
      const nonExistItemIds = ['non-existent-id'];
      cy.setUpApi({
        currentMember: buildMemberWithFavorites(
          favoriteItems.concat(nonExistItemIds),
        ),
        items: PUBLISHED_ITEMS,
      });
      cy.visit(MY_LIST_ROUTE);

      // verify item cards are displayed
      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getCurrentMember');
      cy.get(`#${MY_FAVORITES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', favoriteItems.length);
    });
  });
});
