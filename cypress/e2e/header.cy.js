import { HOME_ROUTE } from '../../src/config/routes';
import { HEADER_ALL_COLLECTIONS_ID } from '../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { SIGNED_OUT_MEMBER } from '../fixtures/members';

describe('Header', () => {
  describe('Signed In User', () => {
    beforeEach(() => {
      cy.setUpApi({ items: PUBLISHED_ITEMS });
      cy.visit(HOME_ROUTE);
    });

    it('Layout', () => {
      cy.get(`#${HEADER_ALL_COLLECTIONS_ID}`).should('be.visible');
      // cy.get(`#${HEADER_MY_LIST_ID}`).should('be.visible');
    });
  });

  describe('Signed Out User', () => {
    beforeEach(() => {
      cy.setUpApi({ items: PUBLISHED_ITEMS, currentMember: SIGNED_OUT_MEMBER });
      cy.visit(HOME_ROUTE);
    });

    it('Do not show My List if signed out', () => {
      cy.get(`#${HEADER_ALL_COLLECTIONS_ID}`).should('be.visible');
      // cy.get(`#${HEADER_MY_LIST_ID}`).should('not.exist');
    });
  });
});
