import { DiscriminatedItem, ItemType } from '@graasp/sdk';

// fallback collection
export const PLACEHOLDER_COLLECTION: DiscriminatedItem = {
  id: '',
  path: '',
  settings: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: 'Loading...',
  description: 'loading...',
  lang: '',
  creator: null,
  type: ItemType.FOLDER,
  extra: { [ItemType.FOLDER]: { childrenOrder: [] } },
};

export const PLACEHOLDER_COLLECTIONS = Array.from(
  { length: 10 },
  (v, index) => ({
    ...PLACEHOLDER_COLLECTION,
    id: `loading-collection-${index}`,
  }),
);
