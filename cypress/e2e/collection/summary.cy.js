import { isChildOf } from '@graasp/sdk';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import {
  COLLECTION_LOADING_TIME,
  PERMISSION_LEVELS,
} from '../../support/constants';

import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { MEMBERS } from '../../fixtures/members';
import {
  buildContributorId,
  CHILDREN_ITEMS_GRID_ID,
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_AUTHOR_CONTAINER_ID,
} from '../../../src/config/selectors';

describe('Collection Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it('Layout', () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      // name
      cy.get(`#${ITEM_SUMMARY_TITLE_ID}`).should('have.text', item.name);

      // children
      const children = PUBLISHED_ITEMS.filter(({ path }) =>
        isChildOf(path, item.path),
      );
      cy.get(`#${CHILDREN_ITEMS_GRID_ID}`)
        .children()
        .should('have.length', children.length);

      // author
      const authorName = Object.values(MEMBERS).find(
        ({ id }) => id === item.creator,
      )?.name;
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should('contain', authorName);

      // contributors
      const contributors = item.memberships.filter(
        ({ permission, memberId }) =>
          permission === PERMISSION_LEVELS.ADMIN && memberId !== item.creator,
      );
      contributors.forEach(({ memberId }) => {
        cy.get(`#${buildContributorId(memberId)}`).should('exist');
      });
    });

    it('Hide co-editor', () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[1];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      // author
      const authorName = Object.values(MEMBERS).find(
        ({ id }) => id === item.creator,
      )?.name;
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should('contain', authorName);

      // contributors
      const contributors = item.memberships.filter(
        ({ permission, memberId }) =>
          permission === PERMISSION_LEVELS.ADMIN && memberId !== item.creator,
      );
      contributors.forEach(({ memberId }) => {
        cy.get(`#${buildContributorId(memberId)}`).should('not.exist');
      });
    });
  });
});
