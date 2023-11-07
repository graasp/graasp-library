import { Category, CompleteMember } from '@graasp/sdk';

import { MockItem, MockItemLike, MockMember } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(arg: {
        items: MockItem[];
        members?: MockMember[];
        currentMember?: CompleteMember & { thumbnail?: string | undefined };
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
