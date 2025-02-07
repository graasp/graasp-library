import { MockItem, MockItemLike, MockMember } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(arg: {
        items: MockItem[];
        recentCollections?: MockItem[];
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

export {};
