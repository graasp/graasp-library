import { ItemLike } from '@graasp/sdk';

import { PUBLISHED_ITEMS } from './items';
import { MEMBERS } from './members';

// todo: fix types
// eslint-disable-next-line import/prefer-default-export
export const ITEM_LIKES: ItemLike[] = [
  {
    itemId: PUBLISHED_ITEMS[0].id,
    memberId: MEMBERS.ANNA.id,
  },
  {
    itemId: PUBLISHED_ITEMS[3].id,
    memberId: MEMBERS.ANNA.id,
  },
];
