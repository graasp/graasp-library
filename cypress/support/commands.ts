import { ITEM_LIKES } from '../fixtures/itemLikes';
import { PUBLISHED_ITEMS } from '../fixtures/items';
import { MEMBERS } from '../fixtures/members';
import {
  mockCopyItems,
  mockGetAccessibleItems,
  mockGetAvatarUrl,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetFeaturedCollections,
  mockGetItem,
  mockGetItemMembershipsForItem,
  mockGetItemThumbnailUrl,
  mockGetLikedItems,
  mockGetMember,
  mockGetMostLikedCollections,
  mockGetPublishItemInformations,
  mockGetRecentCollections,
  mockGetTagsByItem,
  mockSearch,
  mockSignInRedirection,
  mockSignOut,
} from './server';
import { MockItem, MockItemLike, MockMember } from './types';

Cypress.Commands.add(
  'setUpApi',
  ({
    items,
    members = Object.values(MEMBERS),
    currentMember,
    recentCollections = [],
    mostLikedCollections = [],
    featuredCollections = [],
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
    mockGetMostLikedCollections(mostLikedCollections);
    mockGetFeaturedCollections(featuredCollections);

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

    mockGetItemMembershipsForItem({ items, currentMember });

    mockSearch({ searchResultItems }, searchError);

    mockGetLikedItems({ itemLikes }, getLikedItemsError);

    mockCopyItems();
  },
);

declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(arg: {
        items: MockItem[];
        recentCollections?: MockItem[];
        mostLikedCollections?: MockItem[];
        featuredCollections?: MockItem[];
        accessibleItems?: MockItem[];
        members?: MockMember[];
        currentMember?: MockMember;
        getCurrentMemberError?: boolean;
        getCategoriesError?: boolean;
        getItemCategoriesError?: boolean;
        searchResultItems?: MockItem[];
        searchError?: boolean;
        itemLikes?: MockItemLike[];
        getLikedItemsError?: boolean;
        getItemError?: boolean;
        getItemThumbnailError?: boolean;
        getPublishedItemsInCategoriesError?: boolean;
        tags?: { id: string; name: string }[];
        // eslint-disable-next-line
      }): Chainable<JQuery<HTMLElement>>;
    }
  }
}
