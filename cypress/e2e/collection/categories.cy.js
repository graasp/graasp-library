import { buildCollectionRoute } from '../../../src/config/routes';
import { SUMMARY_CATEGORIES_CONTAINER_ID } from '../../../src/config/selectors';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';

describe('Categories in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(
      `Display item's categories for ${environment.currentMember.name}`,
      { defaultCommandTimeout: 10000 },
      () => {
        cy.setUpApi(environment);

        const item = PUBLISHED_ITEMS[0];
        cy.visit(buildCollectionRoute(item.id));

        item.categories.forEach(({ categoryId }) => {
          const category = SAMPLE_CATEGORIES.find(
            ({ id }) => id === categoryId,
          );
          cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should(
            'contain',
            category?.name,
          );
        });
      },
    );
  });
});
