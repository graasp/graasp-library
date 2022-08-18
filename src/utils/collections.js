import { List, Record } from 'immutable';

// fallback collection
export const PLACEHOLDER_COLLECTION = {
  name: 'Loading...',
  description: 'loading...',
  children: [],
  creator: null,
};

export const PLACEHOLDER_COLLECTIONS = List(
  Array.from({ length: 10 }, (v, index) =>
    Record({
      id: `loading-collection-${index}`,
      ...PLACEHOLDER_COLLECTION,
    }),
  ),
);

// todo: let the backend remove the errors
export const filterErrorItems = (collections) =>
  collections?.filter((c) => c && !c?.statusCode);
