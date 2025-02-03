import { ITEM_LIKES } from '../fixtures/itemLikes';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { MEMBERS } from '../fixtures/members';
import {
  mockCopyItems,
  mockGetAccessibleItems,
  mockGetAvatarUrl,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetItem,
  mockGetItemMembershipsForItems,
  mockGetItemThumbnailUrl,
  mockGetLikedItems,
  mockGetMember,
  mockGetPublishItemInformations,
  mockGetRecentCollections,
  mockGetTagsByItem,
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
    recentCollections = [],
    accessibleItems = [],
    getCurrentMemberError = false,
    searchResultItems = PUBLISHED_ITEMS,
    searchError = false,
    itemLikes = ITEM_LIKES,
    getLikedItemsError = false,
    getItemError = false,
    getItemThumbnailError = false,
  } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    mockGetAccessibleItems(accessibleItems);

    mockGetRecentCollections(recentCollections);

    mockGetChildren({ items, currentMember });

    mockGetMember({ members: cachedMembers, currentMember });

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem({ items, currentMember }, getItemError);

    mockGetAvatarUrl({ members });

    mockGetItemThumbnailUrl({ items, currentMember }, getItemThumbnailError);

    mockSignInRedirection();

    mockSignOut();

    mockGetPublishItemInformations(items);

    mockGetTagsByItem({ items });

    mockGetItemMembershipsForItems({ items, currentMember });

    mockSearch({ searchResultItems }, searchError);

    mockGetLikedItems({ itemLikes }, getLikedItemsError);

    mockCopyItems();
  },
);
