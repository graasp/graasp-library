import { DateTime } from 'luxon';

import { isChildOf } from '@graasp/sdk';

import { buildCollectionRoute } from '../../../src/config/routes';
import {
  CHILDREN_ITEMS_GRID_ID,
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_AUTHOR_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  buildContributorId,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { MEMBERS } from '../../fixtures/members';
import { PERMISSION_LEVELS } from '../../support/constants';

describe('Collection Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it('Layout', { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      // current member
      const member = Object.values(MEMBERS).find(
        ({ name }) => name === environment.currentMember.name,
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
        ({ id }) => id === item.creator,
      )?.name;
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should('contain', authorName);

      // created at
      if (item.createdAt) {
        cy.get(`#${SUMMARY_CREATED_AT_CONTAINER_ID}`).should(
          'contain',
          DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATE_FULL, {
            locale: member?.extra?.lang,
          }),
        );
      }

      // last update
      if (item.updatedAt) {
        cy.get(`#${SUMMARY_LAST_UPDATE_CONTAINER_ID}`).should(
          'contain',
          DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATE_FULL, {
            locale: member?.extra?.lang,
          }),
        );
      }

      // contributors
      const contributors = item.memberships.filter(
        ({ permission, memberId }) =>
          permission === PERMISSION_LEVELS.ADMIN && memberId !== item.creator,
      );
      contributors.forEach(({ memberId }) => {
        cy.get(`#${buildContributorId(memberId)}`).should('exist');
      });
    });

    it(
      'CC license matches top level element',
      { defaultCommandTimeout: 20000 },
      () => {
        cy.setUpApi(environment);

        const parentItem = PUBLISHED_ITEMS[0];
        const child = PUBLISHED_ITEMS[2];

        if (parentItem.settings.ccLicenseAdaption && child !== undefined) {
          cy.visit(buildCollectionRoute(child.id));

          cy.get(`#${SUMMARY_CC_LICENSE_CONTAINER_ID}`).should(
            'have.class',
            parentItem.settings.ccLicenseAdaption,
          );
        }
      },
    );

    it('Hide co-editor', { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[1];
      cy.visit(buildCollectionRoute(item.id));

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
