export const COLLECTIONS_ROUTE = '/collections';
export const buildCollectionRoute = (id = ':id') => `/collections/${id}`;
export const HOME_ROUTE = '/';
export const SEARCH_ROUTE = '/search' as const;
export const OER_INFORMATION_ROUTE = '/oer';
export const MY_LIKED_ITEMS_ROUTE = '/liked';
export const ERROR_ROUTE = '/error';

export const buildMemberRoute = (id = ':id') => `/members/${id}`;
