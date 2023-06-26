import { List } from 'immutable';

import { DiscriminatedItem, ItemType, convertJs } from '@graasp/sdk';

// fallback collection
export const PLACEHOLDER_COLLECTION: DiscriminatedItem = {
  id: '',
  path: '',
  settings: {},
  createdAt: new Date(),
  updatedAt: new Date(),
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

// todo: let the backend remove the errors
export const filterErrorItems = <T extends object>(
  collections?: List<T | undefined | { statusCode: number }>,
): List<T> =>
  collections?.filter((c) => {
    if (!c || (c && 'statusCode' in c)) {
      return false;
    }
    return true;
  }) as List<T>;
