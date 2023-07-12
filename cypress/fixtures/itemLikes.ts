import { MockItemLike } from '../support/types';
import { PUBLISHED_ITEMS } from './items';
import { MEMBERS } from './members';

// eslint-disable-next-line import/prefer-default-export
export const ITEM_LIKES: MockItemLike[] = [
  {
    id: '92d514fb-2698-4c44-b93f-1214f86e2365',
    item: PUBLISHED_ITEMS[0],
    creator: MEMBERS.ANNA,
  },
  {
    id: '822af044-ebf2-4c99-97f8-2e35d642f3cf',
    item: PUBLISHED_ITEMS[3],
    creator: MEMBERS.ANNA,
  },
];
