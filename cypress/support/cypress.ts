import { Category } from '@graasp/sdk';

import { MockItem, MockItemLike, MockMember } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(arg: {
        items: MockItem[];
        members?: MockMember[];
        currentMember?: MockMember;
        categories?: Category[];
        getCurrentMemberError?: boolean;
        getCategoriesError?: boolean;
        getItemCategoriesError?: boolean;
        searchResultItems?: MockItem[];
        searchError?: boolean;
        itemLikes?: MockItemLike[];
        getLikedItemsError?: boolean;
        getItemError?: boolean;
        getTagsError?: boolean;
        getItemThumbnailError?: boolean;
        getPublishedItemsInCategoriesError?: boolean;
        tags?: { id: string; name: string }[];
      }): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
