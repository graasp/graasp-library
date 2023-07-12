import { MY_LIST_ROUTE } from '../../../src/config/routes';
import { MY_FAVORITES_COLLECTIONS_ID } from '../../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { CURRENT_USER } from '../../fixtures/members';

describe.skip('My Favorite Items', () => {
  const favoriteItems = [PUBLISHED_ITEMS[0].id, PUBLISHED_ITEMS[3].id];
  describe('Current user', () => {
    it('display favorite items', () => {
      cy.setUpApi({
        currentMember: CURRENT_USER,
        items: PUBLISHED_ITEMS,
      });
      cy.visit(MY_LIST_ROUTE);

      // todo call changed
      // // verify item cards are displayed
      // cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
      //   expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      // });
      cy.wait('@getCurrentMember');
      cy.get(`#${MY_FAVORITES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', favoriteItems.length);
    });
  });
  describe('Favorite items include non-existent items', () => {
    it('does not throw error', () => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      cy.visit(MY_LIST_ROUTE);

      // todo: call changed
      // // verify item cards are displayed
      // cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
      //   expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      // });
      cy.wait('@getCurrentMember');
      cy.get(`#${MY_FAVORITES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', favoriteItems.length);
    });
  });
});
