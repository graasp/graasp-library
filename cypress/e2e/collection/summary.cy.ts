import { PermissionLevel, formatDate, isChildOf } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';

import { buildCollectionRoute } from '../../../src/config/routes';
import {
  CHILDREN_ITEMS_GRID_ID,
  ITEM_SUMMARY_TITLE_ID,
  LIKE_COLLECTION_NOT_LOGGED_ID,
  SUMMARY_AUTHOR_CONTAINER_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  buildContributorId,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { COMPLETE_MEMBERS, MEMBERS } from '../../fixtures/members';

describe('Collection Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it('Layout', { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      // current member
      const member = Object.values(COMPLETE_MEMBERS).find(
        ({ name }) => name === environment.currentMember?.name,
      );

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
        ({ id }) => id === item.creator?.id,
      )?.name;
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should('contain', authorName);

      // created at
      if (item.createdAt) {
        cy.get(`#${SUMMARY_CREATED_AT_CONTAINER_ID}`).should(
          'contain',
          formatDate(item.createdAt, {
            locale: member?.extra?.lang || DEFAULT_LANG,
          }),
        );
      }

      // last update
      if (item.updatedAt) {
        cy.get(`#${SUMMARY_LAST_UPDATE_CONTAINER_ID}`).should(
          'contain',
          formatDate(item.updatedAt, {
            locale: member?.extra?.lang || DEFAULT_LANG,
          }),
        );
      }

      // contributors
      const contributors = item.memberships?.filter(
        ({ permission, member: membershipMember }) =>
          permission === PermissionLevel.Admin &&
          membershipMember.id !== item.creator?.id,
      );
      contributors?.forEach(({ member: membershipMember }) => {
        cy.get(`#${buildContributorId(membershipMember.id)}`).should('exist');
      });
    });

    it('Show like button', () => {
      cy.setUpApi(environment);
      const item = PUBLISHED_ITEMS[1];
      cy.visit(buildCollectionRoute(item.id));

      if (environment.currentMember) {
        cy.get(`button[aria-label="like"]`).should('be.visible');
      } else {
        cy.get(`button[aria-label="like"]`).click();
        cy.get(`#${LIKE_COLLECTION_NOT_LOGGED_ID}`).should('exist');
      }
    });

    it('Hide co-editor', { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[1];
      cy.visit(buildCollectionRoute(item.id));

      // author
      const authorName = Object.values(MEMBERS).find(
        ({ id }) => id === item.creator?.id,
      )?.name;
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should('contain', authorName);

      // contributors
      const contributors = item.memberships?.filter(
        ({ permission, member: membershipMember }) =>
          permission === PermissionLevel.Admin &&
          membershipMember.id !== item.creator?.id,
      );
      contributors?.forEach(({ member: membershipMember }) => {
        cy.get(`#${buildContributorId(membershipMember.id)}`).should(
          'not.exist',
        );
      });
    });
  });
});
