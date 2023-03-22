import {
  SAMPLE_CATEGORIES,
  SAMPLE_CATEGORY_TYPES,
} from '../fixtures/categories';
import { SAMPLE_FLAGS } from '../fixtures/flags';
import { ITEM_LIKES } from '../fixtures/itemLikes';
import { DEFAULT_TAGS } from '../fixtures/itemTags';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { MEMBERS } from '../fixtures/members';
import {
  mockGetAvatarUrl,
  mockGetCategories,
  mockGetCategoryTypes,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetFlags,
  mockGetItem,
  mockGetItemCategories,
  mockGetItemMembershipsForItem,
  mockGetItemTags,
  mockGetItemThumbnailUrl,
  mockGetLikedItems,
  mockGetMember,
  mockGetMembers,
  mockGetOwnItems,
  mockGetPublishedItemsInCategories,
  mockSearch,
  mockSignInRedirection,
  mockSignOut,
} from './server';

Cypress.Commands.add(
  'setUpApi',
  ({
    items,
    members = Object.values(MEMBERS),
    currentMember = MEMBERS.ANNA,
    categories = SAMPLE_CATEGORIES,
    categoryTypes = SAMPLE_CATEGORY_TYPES,
    getCurrentMemberError = false,
    getCategoriesError = false,
    getItemCategoriesError = false,
    flags = SAMPLE_FLAGS,
    searchResultItems = PUBLISHED_ITEMS,
    searchError = false,
    itemLikes = ITEM_LIKES,
    getLikedItemsError = false,
    tags = DEFAULT_TAGS,
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    if (currentMember?.id) {
      cy.setCookie('session', currentMember?.id);
    }

    mockGetOwnItems({ items, currentMember });

    mockGetChildren({ items, currentMember });

    mockGetMember({ members: cachedMembers, currentMember });
    mockGetMembers({ members: cachedMembers, currentMember });

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem({ items, currentMember });

    mockGetItemTags({ tags });

    mockGetAvatarUrl({ members, currentMember });

    mockGetItemThumbnailUrl({ items, currentMember });

    mockSignInRedirection();

    mockSignOut();

    mockGetCategoryTypes(categoryTypes);

    mockGetCategories(categories, getCategoriesError);

    mockGetItemCategories({ items, currentMember }, getItemCategoriesError);

    mockGetPublishedItemsInCategories({ items });

    mockGetItemMembershipsForItem({ items, currentMember });

    mockGetFlags({ flags, currentMember });
    mockSearch({ searchResultItems }, searchError);

    mockGetLikedItems({ itemLikes }, getLikedItemsError);
  },
);

Cypress.Commands.add(
  'checkContentInElementInIframe',
  (iframeSelector, elementSelector, text) =>
    cy
      .get(iframeSelector)
      .then(($iframe) =>
        cy
          .wrap($iframe.contents().find(elementSelector))
          .should('contain', text),
      ),
);
