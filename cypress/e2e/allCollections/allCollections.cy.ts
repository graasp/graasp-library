import { HttpMethod, TagCategory } from '@graasp/sdk';
import { namespaces } from '@graasp/translations';

import { LIBRARY_NAMESPACE, i18nConfig } from '../../../src/config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../src/config/routes';
import {
  ALL_COLLECTIONS_GRID_ID,
  ALL_COLLECTIONS_TITLE_ID,
  ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID,
  FILTER_CHIP_CY,
  FILTER_POPPER_ID,
  HOME_SEARCH_ID,
  LIKE_COUNTER_CY,
  SEARCH_FILTER_LANG_ID,
  buildCategoryOptionSelector,
  buildCollectionCardGridId,
  buildFilterInputSelector,
  buildSearchFilterPopperButtonId,
  buildSearchFilterTagCategoryId,
  dataCyWrapper,
} from '../../../src/config/selectors';
import LIBRARY from '../../../src/langs/constants';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { getRootPublishedItems } from '../../support/utils';

const i18n = i18nConfig();

const removeFirstChip = () => {
  cy.get(
    `#not-sticky [data-cy="${FILTER_CHIP_CY}"]:first-child > svg[data-testid="CancelIcon"]`,
  ).click();
};

buildPublicAndPrivateEnvironments(PUBLISHED_ITEMS).forEach((environment) => {
  describe(`All Collections Page for ${
    environment.currentMember?.name ?? 'signed out user'
  }`, () => {
    // check if title and headings are displayed correctly
    beforeEach(() => {
      cy.setUpApi(environment);
      if (environment.currentMember?.extra.lang) {
        i18n.changeLanguage(environment.currentMember.extra.lang);
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const category of Object.values(TagCategory)) {
        cy.intercept(
          {
            method: HttpMethod.Post,
            url: /items\/collections\/facets/,
            query: { facetName: category },
          },
          ({ reply }) => {
            return reply({ facet: 1, hello: 2 });
          },
        ).as(`getFacets-${category}`);
      }
    });

    it('Layout', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      cy.get(`#${ALL_COLLECTIONS_TITLE_ID}`).should('be.visible');

      // filter header
      cy.get(`#${buildSearchFilterTagCategoryId(TagCategory.Level)}`).should(
        'contain.text',
        i18n.t(TagCategory.Level, { count: 2, ns: namespaces.enums }),
      );
      cy.get(
        `#${buildSearchFilterTagCategoryId(TagCategory.Discipline)}`,
      ).should(
        'contain.text',
        i18n.t(TagCategory.Discipline, { count: 2, ns: namespaces.enums }),
      );
      cy.get(
        `#${buildSearchFilterTagCategoryId(TagCategory.ResourceType)}`,
      ).should(
        'contain.text',
        i18n.t(TagCategory.ResourceType, { count: 2, ns: namespaces.enums }),
      );
      cy.get(`#${SEARCH_FILTER_LANG_ID}`).should(
        'contain.text',
        i18n.t(LIBRARY.SEARCH_FILTER_LANG_TITLE, { ns: LIBRARY_NAMESPACE }),
      );

      // verify 2 item cards are displayed (without children)
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      cy.get(`[id^=${buildCollectionCardGridId('')}]`).should(
        'have.length',
        getRootPublishedItems(environment.items).length,
      );

      // verify 6 item cards are displayed (including children)
      cy.get(`#${ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID}`).check();
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);
      cy.get(`[id^=${buildCollectionCardGridId('')}]`).should(
        'have.length',
        environment.items.length,
      );

      environment.items.forEach(
        ({
          id,
          likes,
          discipline = [],
          level = [],
          'resource-type': rt = [],
        }) => {
          // likes
          if (likes) {
            cy.get(
              `#${buildCollectionCardGridId(id)} ${dataCyWrapper(LIKE_COUNTER_CY)}`,
            ).should('contain', likes);
          }
          // tags
          [...discipline, ...level, ...rt].forEach((d) => {
            cy.get(`#${buildCollectionCardGridId(id)}`).should('contain', d);
          });
        },
      );
    });

    it('toggle published root', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      cy.get(`#${ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID}`).check();

      // should contain query in search
      cy.wait(['@search', '@search']).then(([firstCall, secondCall]) => {
        expect(firstCall.request.body.isPublishedRoot).to.eq(true);
        expect(secondCall.request.body.isPublishedRoot).to.eq(false);
      });

      // should contain query in facets
      cy.wait([
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
      ]).then(([firstCall, secondCall]) => {
        expect(firstCall.request.body.isPublishedRoot).to.eq(true);
        expect(secondCall.request.body.isPublishedRoot).to.eq(false);
      });
    });

    it('select/unselect language options', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      cy.intercept(
        {
          method: HttpMethod.Post,
          url: /items\/collections\/facets/,
          query: { facetName: 'lang' },
        },
        ({ reply }) => {
          return reply({ en: 1, fr: 2 });
        },
      );

      cy.get(buildFilterInputSelector('lang')).click();
      cy.get(`#${FILTER_POPPER_ID}`).should('contain', 'English');
      cy.get(`#${FILTER_POPPER_ID}`).should('contain', 'Français');

      // type and should display no option
      cy.get(buildFilterInputSelector(TagCategory.Level)).type(
        'some random text',
      );
      cy.get(`#${FILTER_POPPER_ID} checkbox`).should('not.exist');

      // type and should display only "facet", select it
      cy.get(buildFilterInputSelector('lang')).clear().type('En');
      cy.get(`#${FILTER_POPPER_ID}`).should('contain', 'English');
      cy.get(`#${FILTER_POPPER_ID}`).should('not.contain', 'Français');
      cy.get(buildCategoryOptionSelector(0)).click();

      // clear and select 2nd option
      cy.get(buildFilterInputSelector('lang')).clear().click();
      cy.get(buildCategoryOptionSelector(1)).click();

      // trigger search
      cy.wait(['@search', '@search', '@search']).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _secondCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.langs).to.contain('en');
          expect(body.langs).to.contain('fr');
        },
      );

      // should update other facets
      cy.wait([
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
      ]).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _secondCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.langs).to.include('en');
          expect(body.langs).to.include('fr');
        },
      );

      cy.get(`[data-cy="${FILTER_CHIP_CY}"]`).should('contain', 'English');
      cy.get(`[data-cy="${FILTER_CHIP_CY}"]`).should('contain', 'Français');

      // remove "English"
      removeFirstChip();

      // update search
      cy.wait('@search').then(({ request: { body } }) => {
        expect(body.langs).to.have.length(1);
        expect(body.langs).to.contain('fr');
      });

      // should update other facets
      cy.wait(`@getFacets-${TagCategory.Discipline}`).then(
        ({ request: { body } }) => {
          expect(body.langs).to.have.length(1);
          expect(body.langs).to.contain('fr');
        },
      );

      // remains "Français"
      cy.get(`[data-cy="${FILTER_CHIP_CY}"]`).should('contain', 'Français');
    });

    it.skip('scroll to bottom and search should pop out', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      cy.get(`#${ALL_COLLECTIONS_GRID_ID}`);

      cy.scrollTo('bottom');

      cy.get(`#${buildSearchFilterPopperButtonId(TagCategory.Level)}`).click();
      cy.get(`#${buildSearchFilterTagCategoryId(TagCategory.Level)}`).should(
        'be.visible',
      );
    });

    it('select/unselect tag categories', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      // search allows to get all the published items
      cy.wait('@search');

      // type and should display no option
      cy.get(buildFilterInputSelector(TagCategory.Level)).type(
        'some random text',
      );
      cy.get(`#${FILTER_POPPER_ID} checkbox`).should('not.exist');

      // type and should display only "facet", select it
      cy.get(buildFilterInputSelector(TagCategory.Level)).clear().type('facet');
      cy.get(`#${FILTER_POPPER_ID}`).should('contain', 'facet');
      cy.get(`#${FILTER_POPPER_ID}`).should('not.contain', 'hello');
      cy.get(buildCategoryOptionSelector(0)).click();

      // clear and select 2nd option
      cy.get(buildFilterInputSelector(TagCategory.Level)).clear().click();

      cy.get(buildCategoryOptionSelector(1)).click();
      cy.wait(['@search', '@search']).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.tags.level).to.contain('facet');
          expect(body.tags.level).to.contain('hello');
        },
      );

      // should update other facets
      cy.wait([
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
      ]).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _secondCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.tags.level).to.include('facet');
        },
      );

      cy.get(`[data-cy="${FILTER_CHIP_CY}"]`).should('contain', 'facet');

      // remove "facet"
      removeFirstChip();

      // update search
      cy.wait('@search').then(({ request: { body } }) => {
        expect(body.tags.level).to.have.length(1);
        expect(body.tags.level).to.contain('hello');
      });

      // should update other facets
      cy.wait(`@getFacets-${TagCategory.Discipline}`).then(
        ({ request: { body } }) => {
          expect(body.tags.level).to.have.length(1);
          expect(body.tags.level).to.contain('hello');
        },
      );

      // only "hello" remains
      cy.get(`[data-cy="${FILTER_CHIP_CY}"]`).should('contain', 'hello');
    });

    it('start with search filter in url', () => {
      const searchQuery = 'star';

      cy.visit(`${ALL_COLLECTIONS_ROUTE}?s=star`);
      cy.get(`#${HOME_SEARCH_ID}`).should('have.value', searchQuery);

      // should contain query in search
      cy.wait(['@search', '@search']).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.query).to.eq(searchQuery);
        },
      );

      // should contain query in facets
      cy.wait([
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
      ]).then(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _firstCall,
          {
            request: { body },
          },
        ]) => {
          expect(body.query).to.eq(searchQuery);
        },
      );
    });

    it('type search', () => {
      cy.visit(ALL_COLLECTIONS_ROUTE);
      const searchQuery = 'star';

      cy.get(`#${HOME_SEARCH_ID}`).type(searchQuery);

      // should contain query in search
      cy.wait(['@search', '@search']).then(([firstCall, secondCall]) => {
        expect(firstCall.request.body.query).to.eq('');
        expect(secondCall.request.body.query).to.eq(searchQuery);
      });

      // should contain query in facets
      cy.wait([
        `@getFacets-${TagCategory.Discipline}`,
        `@getFacets-${TagCategory.Discipline}`,
      ]).then(([firstCall, secondCall]) => {
        expect(firstCall.request.body.query).to.eq('');
        expect(secondCall.request.body.query).to.eq(searchQuery);
      });
    });
  });
});
