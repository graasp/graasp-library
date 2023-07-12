import { HOME_ROUTE } from '../../src/config/routes';
import { ALL_COLLECTIONS_HEADER_ID } from '../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { CURRENT_USER } from '../fixtures/members';

describe('Header', () => {
  describe('Signed In User', () => {
    beforeEach(() => {
      cy.setUpApi({ items: PUBLISHED_ITEMS, currentMember: CURRENT_USER });
      cy.visit(HOME_ROUTE);
    });

    it('Layout', () => {
      cy.get(`#${ALL_COLLECTIONS_HEADER_ID}`).should('be.visible');
      // cy.get(`#${HEADER_MY_LIST_ID}`).should('be.visible');
    });
  });

  describe('Signed Out User', () => {
    beforeEach(() => {
      cy.setUpApi({ items: PUBLISHED_ITEMS });
      cy.visit(HOME_ROUTE);
    });

    it('Do not show My List if signed out', () => {
      cy.get(`#${ALL_COLLECTIONS_HEADER_ID}`).should('be.visible');
      // cy.get(`#${HEADER_MY_LIST_ID}`).should('not.exist');
    });
  });
});
