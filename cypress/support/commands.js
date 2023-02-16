import {
  mockGetChildren,
  mockGetMember,
  mockGetCurrentMember,
  mockSignInRedirection,
  mockSignOut,
  mockGetCategoryTypes,
  mockGetCategories,
  mockGetItemCategories,
  mockGetPublishedItemsInCategories,
  mockGetAvatar,
  mockGetItemThumbnail,
  mockGetItem,
  mockGetMembers,
  mockGetItemMembershipsForItem,
  mockGetPublicItemMembershipsForItem,
  mockGetPublicItem,
  mockGetOwnItems,
  mockGetPublicMembers,
  mockGetPublicMember,
  mockGetPublicChildren,
  mockGetPublicItemCategories,
  mockGetFlags,
  mockGetPublicItemsWithTags,
  mockSearch,
  mockGetLikedItems,
  mockGetItemTags,
} from './server';
import { MEMBERS } from '../fixtures/members';
import {
  SAMPLE_CATEGORIES,
  SAMPLE_CATEGORY_TYPES,
} from '../fixtures/categories';
import { SAMPLE_FLAGS } from '../fixtures/flags';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { ITEM_LIKES } from '../fixtures/itemLikes';
import { DEFAULT_TAGS } from '../fixtures/itemTags';

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
    mockGetPublicChildren({ items });

    mockGetMember({ members: cachedMembers, currentMember });
    mockGetPublicMember({ members: cachedMembers });
    mockGetMembers({ members: cachedMembers, currentMember });
    mockGetPublicMembers({ members: cachedMembers });

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem({ items, currentMember });
    mockGetPublicItem({ items });
    mockGetItemTags({ tags });

    mockGetAvatar({ members, currentMember });

    mockGetItemThumbnail({ items, currentMember });

    mockSignInRedirection();

    mockSignOut();

    mockGetCategoryTypes(categoryTypes);

    mockGetCategories(categories, getCategoriesError);

    mockGetItemCategories({ items, currentMember }, getItemCategoriesError);
    mockGetPublicItemCategories({ items }, getItemCategoriesError);

    mockGetPublishedItemsInCategories({ items });
    mockGetPublicItemsWithTags({ items });

    mockGetItemMembershipsForItem({ items, currentMember });
    mockGetPublicItemMembershipsForItem({ items });

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
