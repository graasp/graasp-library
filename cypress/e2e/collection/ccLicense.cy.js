import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { SUMMARY_CC_LICENSE_CONTAINER_ID, SUMMARY_CC_LICENSE_NO_LICENSE_ID } from '../../../src/config/selectors';

describe('CC License in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's cc license for ${environment.currentMember.name}`, { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      cy.get(`#${SUMMARY_CC_LICENSE_CONTAINER_ID}`).should('be.exist');
    });

    it(`No cc license to display for ${environment.currentMember.name}`, { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[5];
      
      cy.visit(buildCollectionRoute(item.id));

      cy.get(`#${SUMMARY_CC_LICENSE_NO_LICENSE_ID}`).should('exist');
    });
  });
});


