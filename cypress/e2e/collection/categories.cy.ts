import { buildCollectionRoute } from '../../../src/config/routes';
import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  buildCategoryChipId,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { SIGNED_OUT_USER } from '../../support/constants';

describe('Categories in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(
      `Display item's categories for ${
        environment.currentMember?.name ?? SIGNED_OUT_USER
      }`,
      { defaultCommandTimeout: 10000 },
      () => {
        cy.setUpApi(environment);

        const item = PUBLISHED_ITEMS[0];
        cy.visit(buildCollectionRoute(item.id));

        item.categories?.forEach(({ category }) => {
          cy.get(
            `#${SUMMARY_CATEGORIES_CONTAINER_ID} #${buildCategoryChipId(
              category.name,
            )}`,
          ).should('be.visible');
        });
      },
    );
  });
});
