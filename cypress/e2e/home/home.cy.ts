import { i18nConfig } from '../../../src/config/i18n';
import { HOME_ROUTE } from '../../../src/config/routes';
import {
  GRAASP_SELECTION_TITLE_ID,
  HOME_PAGE_TITLE_TEXT_ID,
  LIKE_COUNTER_CY,
  MOST_LIKED_TITLE_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
  SECTION_TITLE_ID,
  buildCollectionCardGridId,
  dataCyWrapper,
} from '../../../src/config/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { GRAASPER_ITEMS } from '../../fixtures/items';
import { SIGNED_OUT_USER } from '../../support/constants';

const i18n = i18nConfig();

describe('Home Page', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Home Layout for ${
      environment.currentMember?.name ?? SIGNED_OUT_USER
    }`, () => {
      // check if title and headings are displayed correctly
      it('display headings & collections', () => {
        cy.setUpApi(environment);
        if (environment.currentMember?.extra?.lang) {
          i18n.changeLanguage(environment.currentMember?.extra?.lang);
        }
        cy.visit(HOME_ROUTE);

        cy.get(`#${HOME_PAGE_TITLE_TEXT_ID}`).should('be.visible');
        cy.get(`#${RECENT_PUBLICATIONS_TITLE_ID} #${SECTION_TITLE_ID}`)
          .scrollIntoView()
          .should('be.visible');
        cy.get(`#${MOST_LIKED_TITLE_ID} #${SECTION_TITLE_ID}`)
          .scrollIntoView()
          .should('be.visible');

        cy.get(`#${GRAASP_SELECTION_TITLE_ID} #${SECTION_TITLE_ID}`)
          .scrollIntoView()
          .should('be.visible');

        // likes are displayed
        environment.recentCollections.forEach(({ id, likes }) => {
          if (likes) {
            cy.get(
              `#${buildCollectionCardGridId(id)} ${dataCyWrapper(LIKE_COUNTER_CY)}`,
            ).should('contain', likes);
          }
        });
      });

      describe('Graasper items', () => {
        it('No graasper items to show', () => {
          cy.setUpApi(environment);
          cy.visit(HOME_ROUTE);

          // section should not be displayed
          // todo: endpoints have changed
          // cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
          //   console.log('URL', url);
          //   expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
          //   // todo: this succeeds because this element is not implemented anymore
          //   cy.get(`#${GRAASP_SELECTION_TITLE_ID}`)
          //     .should('be.visible')
          //     .and('contain.text', i18n.t(LIBRARY.EMPTY_COLLECTION_MESSAGE));
          // });
        });
        it('Display graasper items', () => {
          const graasperEnvironment = JSON.parse(JSON.stringify(environment));
          graasperEnvironment.items = [
            ...GRAASPER_ITEMS,
            ...(graasperEnvironment.items ?? []),
          ];

          cy.setUpApi(graasperEnvironment);
          cy.visit(HOME_ROUTE);

          // verify graasper cards are displayed
          // todo: endpoints have changed
          // cy.wait('@getPublicItemsWithTags').then(
          //   ({ request: { url }, response: { body } }) => {
          //     expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
          //     cy.get(`#${GRAASP_SELECTION_TITLE_ID}`).should('be.visible');

          //     cy.get(`#${GRAASPER_COLLECTIONS_GRID_ID}`)
          //       .children()
          //       .should('have.length', body.length - 2);
          //     // We will change this later anyways so I just hardcode the number of Grassper items here
          //   },
          // );
        });
      });
    });
  });
});
