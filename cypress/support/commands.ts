import { SAMPLE_CATEGORIES } from '../fixtures/categories';
import { ITEM_LIKES } from '../fixtures/itemLikes';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { MEMBERS } from '../fixtures/members';
import {
  mockCopyItems,
  mockGetAccessibleItems,
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
  mockGetPublishItemInformations,
  mockGetRecentCollections,
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
    recentCollections = [],
    accessibleItems = [],
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
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    mockGetAccessibleItems(accessibleItems);

    mockGetRecentCollections(recentCollections);

    mockGetChildren({ items, currentMember });

    mockGetMember({ members: cachedMembers, currentMember });

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem({ items, currentMember }, getItemError);

    mockGetItemTags(getTagsError);

    mockGetAvatarUrl({ members, currentMember });

    mockGetItemThumbnailUrl({ items, currentMember }, getItemThumbnailError);

    mockSignInRedirection();

    mockSignOut();

    mockGetCategories(categories, getCategoriesError);

    mockGetPublishItemInformations(items);

    mockGetItemCategories({ items, currentMember }, getItemCategoriesError);

    mockGetItemMembershipsForItems({ items, currentMember });

    mockSearch({ searchResultItems }, searchError);

    mockGetLikedItems({ itemLikes }, getLikedItemsError);

    mockCopyItems();
  },
);
