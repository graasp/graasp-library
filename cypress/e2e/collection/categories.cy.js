import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import { COLLECTION_LOADING_TIME } from '../../support/constants';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
} from '../../../src/config/selectors';

describe('Categories in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's categories for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_LANGUAGES_CONTAINER_ID}`).should('not.exist');
      item.categories.forEach(({ categoryId }) => {
        const category = SAMPLE_CATEGORIES.find(({ id }) => id === categoryId);
        cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should(
          'contain',
          category?.name,
        );
      });
    });

    it(`Display item's language for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[4];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should('not.exist');
      item.categories.forEach(({ categoryId }) => {
        const category = SAMPLE_CATEGORIES.find(({ id }) => id === categoryId);
        cy.get(`#${SUMMARY_LANGUAGES_CONTAINER_ID}`).should(
          'contain',
          category?.name,
        );
      });
    });

    it(`No category to display for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[2];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_LANGUAGES_CONTAINER_ID}`).should('not.exist');
      cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should('not.exist');
    });
  });
});
