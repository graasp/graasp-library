import { PUBLISHED_ITEMS } from './items';
import { CURRENT_USER } from './members';

// eslint-disable-next-line import/prefer-default-export
export const buildPublicAndPrivateEnvironments = (items = PUBLISHED_ITEMS) => [
  { items, recentCollections: items },
  { currentMember: CURRENT_USER, items, recentCollections: items },
];
