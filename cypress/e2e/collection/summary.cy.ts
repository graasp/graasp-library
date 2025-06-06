import { PermissionLevel, formatDate, isChildOf } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';

import { i18nConfig } from '../../../src/config/i18n';
import {
  ALL_COLLECTIONS_ROUTE,
  buildCollectionRoute,
} from '../../../src/config/routes';
import {
  CHILDREN_ITEMS_GRID_ID,
  CHILD_CARD_COPY_BUTTON_ID,
  ITEM_SUMMARY_TITLE_ID,
  LIBRARY_ACTION_GROUP_BUTTON_ID,
  LIBRARY_ACTION_GROUP_COPY_BUTTON_ID,
  LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID,
  LIKE_COLLECTION_NOT_LOGGED_ID,
  SUMMARY_AUTHOR_CONTAINER_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  SUMMARY_TAGS_CONTAINER_ID,
  TREE_MODAL_CONFIRM_BUTTON_ID,
  buildContributorId,
} from '../../../src/config/selectors';
import LIBRARY from '../../../src/langs/constants';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { CURRENT_USER, MEMBERS } from '../../fixtures/members';

const i18n = i18nConfig();

describe('Collection Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it('Layout', { defaultCommandTimeout: 10000 }, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      // current member
      const member = Object.values(MEMBERS).find(
        ({ name }) => name === environment.currentMember?.name,
      );

      // name
      cy.get(`#${ITEM_SUMMARY_TITLE_ID}`).should('have.text', item.name);

      // tags

      // eslint-disable-next-line no-restricted-syntax
      for (const { name: t } of item.tags ?? []) {
        cy.get(`#${SUMMARY_TAGS_CONTAINER_ID}`).should('contain', t);
        // clickable tag
        cy.get(
          `#${SUMMARY_TAGS_CONTAINER_ID} a[href="${ALL_COLLECTIONS_ROUTE}?s=${t}"]`,
        ).should('be.visible');
      }
      // children
      const children = PUBLISHED_ITEMS.filter(({ path }) =>
        isChildOf(path, item.path),
      );
      cy.get(`#${CHILDREN_ITEMS_GRID_ID}`)
        .children()
        .should('have.length', children.length);

      // author
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should(
        'contain',
        item.creator?.name,
      );

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
        ({ permission, account: membershipMember }) =>
          permission === PermissionLevel.Admin &&
          membershipMember.id !== item.creator?.id,
      );
      contributors?.forEach(({ account: membershipMember }) => {
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
      cy.get(`#${SUMMARY_AUTHOR_CONTAINER_ID}`).should(
        'contain',
        item.creator?.name,
      );

      // contributors
      const contributors = item.memberships?.filter(
        ({ permission, account: membershipMember }) =>
          permission === PermissionLevel.Admin &&
          membershipMember.id !== item.creator?.id,
      );
      contributors?.forEach(({ account: membershipMember }) => {
        cy.get(`#${buildContributorId(membershipMember.id)}`).should(
          'not.exist',
        );
      });
    });
  });

  describe('Signed out', () => {
    it.only(
      'should not show copy button',
      { defaultCommandTimeout: 10000 },
      () => {
        cy.setUpApi({ items: PUBLISHED_ITEMS });

        const item = PUBLISHED_ITEMS[1];
        cy.visit(buildCollectionRoute(item.id));

        cy.get(`#${LIBRARY_ACTION_GROUP_BUTTON_ID}`).click();
        cy.get(`#${LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID}`)
          .find('li')
          .should('have.length', 2);
      },
    );
  });

  describe('Signed in', () => {
    beforeEach(() => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      i18n.changeLanguage(CURRENT_USER.extra.lang);
    });

    it('copy current item and child', { defaultCommandTimeout: 10000 }, () => {
      cy.intercept({
        method: 'POST',
        url: '/items/copy*',
      }).as('copy');

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));

      // copy parent item on home
      cy.get(`#${LIBRARY_ACTION_GROUP_BUTTON_ID}`).click();
      cy.get(`#${LIBRARY_ACTION_GROUP_COPY_BUTTON_ID}`).click();

      cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).should('be.disabled');
      cy.get(`button`)
        .contains(i18n.t(LIBRARY.COPY_MODAL_MY_GRAASP_BREADCRUMB))
        .click();
      cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).click();

      cy.wait('@copy').then(({ request: { url, body } }) => {
        expect(url).to.contain(item.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(body.to).to.be.undefined;
      });

      // copy child item on home
      const child = PUBLISHED_ITEMS[2];
      cy.get(`#${CHILD_CARD_COPY_BUTTON_ID}`).click();

      cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).should('be.disabled');
      cy.get(`button`)
        .contains(i18n.t(LIBRARY.COPY_MODAL_MY_GRAASP_BREADCRUMB))
        .click();
      cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).click();

      cy.wait('@copy').then(({ request: { url, body } }) => {
        expect(url).to.contain(child.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(body.to).to.be.undefined;
      });
    });
  });
});
