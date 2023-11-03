import { DiscriminatedItem, ItemType, convertJs } from '@graasp/sdk';

// fallback collection
export const PLACEHOLDER_COLLECTION: DiscriminatedItem = {
  id: '',
  path: '',
  settings: {},
  createdAt: Date.now().toString(),
  updatedAt: Date.now().toString(),
  name: 'Loading...',
  description: 'loading...',
  creator: null,
  type: ItemType.FOLDER,
  extra: { [ItemType.FOLDER]: { childrenOrder: [] } },
};

export const PLACEHOLDER_COLLECTIONS = convertJs(
  Array.from({ length: 10 }, (v, index) => ({
    ...PLACEHOLDER_COLLECTION,
    id: `loading-collection-${index}`,
  })),
);
