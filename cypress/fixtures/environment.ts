import { PUBLISHED_ITEMS } from './items';
import { CURRENT_USER } from './members';

export const buildPublicAndPrivateEnvironments = (items = PUBLISHED_ITEMS) => [
  { items, recentCollections: items },
  { currentMember: CURRENT_USER, items, recentCollections: items },
];
