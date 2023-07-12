import { ItemTagType } from '@graasp/sdk';

import { buildCollectionRoute } from '../../../src/config/routes';
import {
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { SIGNED_OUT_USER } from '../../support/constants';

describe('CC License in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(
      `Display item's cc license for ${
        environment.currentMember?.name ?? SIGNED_OUT_USER
      }`,
      { defaultCommandTimeout: 10000 },
      () => {
        cy.setUpApi(environment);

        const item = PUBLISHED_ITEMS[0];
        cy.visit(buildCollectionRoute(item.id));

        cy.get(`#${SUMMARY_CC_LICENSE_CONTAINER_ID}`)
          .should('exist')
          .and('be.visible');
      },
    );

    it(
      `No cc license to display for ${
        environment.currentMember?.name ?? SIGNED_OUT_USER
      }`,
      { defaultCommandTimeout: 10000 },
      () => {
        cy.setUpApi(environment);

        const item = PUBLISHED_ITEMS[5];

        cy.visit(buildCollectionRoute(item.id));
        if (
          !environment.currentMember &&
          item.tags.find((t) => t.type === ItemTagType.Public)
        ) {
          cy.get(`#${SUMMARY_CC_LICENSE_NO_LICENSE_ID}`).should('exist');
        }
      },
    );
  });
});
