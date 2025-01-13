import { HOME_ROUTE } from '../../../src/config/routes';
import { buildCollectionCardCopyButtonId } from '../../../src/config/selectors';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { CURRENT_USER } from '../../fixtures/members';

describe('Signed out', () => {
  it(`Cannot copy`, () => {
    cy.setUpApi({ items: PUBLISHED_ITEMS });
    cy.visit(HOME_ROUTE);

    cy.get(`#${buildCollectionCardCopyButtonId(PUBLISHED_ITEMS[0].id)}`).should(
      'not.exist',
    );
  });
});

describe('Signed in', () => {
  it(`Show my graasp root and recent`, () => {
    cy.setUpApi({
      currentMember: CURRENT_USER,
      items: PUBLISHED_ITEMS,
      accessibleItems: PUBLISHED_ITEMS,
      recentCollections: PUBLISHED_ITEMS,
    });
    cy.visit(HOME_ROUTE);

    // show root item menu in copy dialog
    cy.get(`[role="dialog"] #root`).should('be.visible');
  });

  it(`Show copy button and my graasp for empty accessible`, () => {
    cy.setUpApi({
      currentMember: CURRENT_USER,
      items: PUBLISHED_ITEMS,
      accessibleItems: [],
      recentCollections: PUBLISHED_ITEMS,
    });
    cy.visit(HOME_ROUTE);
    cy.get(
      `#${buildCollectionCardCopyButtonId(PUBLISHED_ITEMS[0].id)}`,
    ).click();

    // show root item menu in copy dialog
    cy.get(`[role="dialog"] #root`).should('be.visible');
  });
});
