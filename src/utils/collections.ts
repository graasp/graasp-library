import { TagCategory } from '@graasp/sdk';

import { ItemOrSearchedItem } from './types';

export function mapTags(collection: ItemOrSearchedItem) {
  const unsortedTags = Object.values(TagCategory).flatMap((category) => {
    if (`${category}` in collection) {
      return (
        collection[category].map((c) => ({ id: c, category, name: c })) ?? []
      );
    }
    return [];
  });
  // shallow copy of unsortedTags
  const tags = [...unsortedTags];
  // sort in place. Can't use .toSorted() because it is a bit too new.
  // ref: https://github.com/graasp/graasp-library/issues/807
  tags.sort((a, b) => (a > b ? 1 : -1));
  return tags;
}
