import { HOME_ROUTE } from '../../src/config/routes';
import {
  HEADER_GRAASP_LOGO_LINK_ID,
  HEADER_NAVIGATION_PLATFORM_SWITCH_ID,
  USER_SWITCH_BUTTON_ID,
} from '../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { CURRENT_USER } from '../fixtures/members';

describe('Header', () => {
  [CURRENT_USER, undefined].forEach((currentMember) => {
    describe(`Signed ${currentMember ? 'In' : 'Out'} User`, () => {
      beforeEach(() => {
        cy.setUpApi({ items: PUBLISHED_ITEMS, currentMember });
        cy.visit(HOME_ROUTE);
      });

      it('Layout', () => {
        // check logo is shown
        cy.get(`#${HEADER_GRAASP_LOGO_LINK_ID}`).should('be.visible');

        // check platform switch is shown
        cy.get(`#${HEADER_NAVIGATION_PLATFORM_SWITCH_ID}`).should('be.visible');

        // check user menu is shown
        cy.get(`#${USER_SWITCH_BUTTON_ID}`).should('be.visible');
        if (currentMember) {
          cy.get(`#${USER_SWITCH_BUTTON_ID}`).should(
            'contain',
            currentMember.name,
          );
        }
      });
    });
  });
});
