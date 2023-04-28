import { buildCollectionRoute } from '../../../src/config/routes';
import { SUMMARY_TAGS_CONTAINER_ID } from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { COLLECTION_LOADING_TIME } from '../../support/constants';

describe('Tags in Summary', { defaultCommandTimeout: 10000 }, () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's tags for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      item.settings.tags.forEach((tag) => {
        cy.get(`#${SUMMARY_TAGS_CONTAINER_ID}`).should('contain', tag);
      });
    });

    it(`No tag to display for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[2];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_TAGS_CONTAINER_ID}`).should('not.exist');
    });
  });
});
