import { SAMPLE_CATEGORIES } from '../fixtures/categories';
import { ITEM_LIKES } from '../fixtures/itemLikes';
import { DEFAULT_TAGS } from '../fixtures/itemTags';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { MEMBERS } from '../fixtures/members';
import {
  mockGetAllPublishedItems,
  mockGetAvatarUrl,
  mockGetCategories,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetItem,
  mockGetItemCategories,
  mockGetItemMembershipsForItems,
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
    currentMember,
    categories = SAMPLE_CATEGORIES,
    getCurrentMemberError = false,
    getCategoriesError = false,
    getItemCategoriesError = false,
    searchResultItems = PUBLISHED_ITEMS,
    searchError = false,
    itemLikes = ITEM_LIKES,
    getLikedItemsError = false,
    getItemError = false,
    getTagsError = false,
    getItemThumbnailError = false,
    getPublishedItemsInCategoriesError = false,
    tags = DEFAULT_TAGS,
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    if (currentMember?.id) {
      cy.setCookie('session', currentMember?.id);
    }

    mockGetAllPublishedItems({ items });

    mockGetOwnItems({ items, currentMember });

    mockGetChildren({ items, currentMember });

    mockGetMember({ members: cachedMembers, currentMember });

    mockGetMembers({ members: cachedMembers, currentMember });

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem({ items, currentMember }, getItemError);

    mockGetItemTags({ tags }, getTagsError);

    mockGetAvatarUrl({ members, currentMember });

    mockGetItemThumbnailUrl({ items, currentMember }, getItemThumbnailError);

    mockSignInRedirection();

    mockSignOut();

    mockGetCategories(categories, getCategoriesError);

    mockGetItemCategories({ items, currentMember }, getItemCategoriesError);

    mockGetPublishedItemsInCategories(
      { items },
      getPublishedItemsInCategoriesError,
    );

    mockGetItemMembershipsForItems({ items, currentMember });

    mockSearch({ searchResultItems }, searchError);

    mockGetLikedItems({ itemLikes }, getLikedItemsError);
  },
);
