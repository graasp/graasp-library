import {
  ALL_COLLECTIONS_ROUTE,
  HOME_ROUTE,
  MY_LIKED_ITEMS_ROUTE,
  buildMemberRoute,
} from '../../src/config/routes';
import {
  GRAASPER_SELECTION_DRAWER_ITEM_ID,
  GRAASP_SELECTION_TITLE_ID,
  LIKED_COLLECTIONS_DRAWER_ITEM_ID,
  MOST_LIKED_COLLECTIONS_DRAWER_ITEM_ID,
  MOST_LIKED_TITLE_ID,
  MY_PUBLICATIONS_DRAWER_ITEM_ID,
  RECENT_COLLECTIONS_DRAWER_ITEM_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
  SEARCH_ALL_COLLECTIONS_DRAWER_ITEM_ID,
} from '../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { CURRENT_USER } from '../fixtures/members';

const expectNewURL = (partialUrl: string) => {
  cy.url({ timeout: 15000 }).should('contain', partialUrl);
};

describe('Header', () => {
  [CURRENT_USER, undefined].forEach((currentMember) => {
    describe(`${currentMember ? 'Signed In User' : 'Signed Out User'}`, () => {
      beforeEach(() => {
        cy.setUpApi({ items: PUBLISHED_ITEMS, currentMember });
      });

      it('Navigate to Search', () => {
        cy.visit(HOME_ROUTE);
        cy.get(`svg[data-testid="MenuIcon"]`).click();
        cy.get(`#${SEARCH_ALL_COLLECTIONS_DRAWER_ITEM_ID}`).click();
        expectNewURL(ALL_COLLECTIONS_ROUTE);
      });

      it('Navigate to Recent', () => {
        cy.visit(ALL_COLLECTIONS_ROUTE);
        cy.get(`svg[data-testid="MenuIcon"]`).click();
        cy.get(`#${RECENT_COLLECTIONS_DRAWER_ITEM_ID}`).click();
        expectNewURL(`${HOME_ROUTE}#${RECENT_PUBLICATIONS_TITLE_ID}`);
      });

      it('Navigate to Most liked', () => {
        cy.visit(ALL_COLLECTIONS_ROUTE);
        cy.get(`svg[data-testid="MenuIcon"]`).click();
        cy.get(`#${MOST_LIKED_COLLECTIONS_DRAWER_ITEM_ID}`).click();
        cy.url({ timeout: 5000 }).should(
          'contain',
          `${HOME_ROUTE}#${MOST_LIKED_TITLE_ID}`,
        );
      });

      it('Navigate to Graasp Selection', () => {
        cy.visit(ALL_COLLECTIONS_ROUTE);
        cy.get(`svg[data-testid="MenuIcon"]`).click();
        cy.get(`#${GRAASPER_SELECTION_DRAWER_ITEM_ID}`).click();
        expectNewURL(`${HOME_ROUTE}#${GRAASP_SELECTION_TITLE_ID}`);
      });
    });
  });

  describe('Signed In Only navigation', () => {
    beforeEach(() => {
      cy.setUpApi({ items: PUBLISHED_ITEMS, currentMember: CURRENT_USER });
      cy.visit(HOME_ROUTE);
    });

    it('Navigate to My publications', () => {
      cy.get(`svg[data-testid="MenuIcon"]`).click();
      cy.get(`#${MY_PUBLICATIONS_DRAWER_ITEM_ID}`).click();
      expectNewURL(buildMemberRoute(CURRENT_USER.id));
    });

    it('Navigate to Liked collections', () => {
      cy.get(`svg[data-testid="MenuIcon"]`).click();
      cy.get(`#${LIKED_COLLECTIONS_DRAWER_ITEM_ID}`).click();
      expectNewURL(MY_LIKED_ITEMS_ROUTE);
    });
  });
});
