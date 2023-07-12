import { Member } from '@graasp/sdk';

import { MockItem } from './types';

// use simple id format for tests
export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

/**
 * Parse characters of a given string to return a correct regex string
 * This function mainly allows for endpoints to have fixed chain of strings
 * as well as regex descriptions for data validation, eg /items/item-login?parentId=<id>
 *
 * @param {string} inputString
 * @param {string[]} characters
 * @param {boolean} parseQueryString
 * @returns regex string of the given string
 */
export const parseStringToRegExp = (
  inputString: string,
  { characters = ['?', '.'], parseQueryString = false } = {},
) => {
  const [originalPathname, ...querystrings] = inputString.split('?');
  let pathname = originalPathname;
  let querystring = querystrings.join('?');
  characters.forEach((c) => {
    pathname = pathname.replaceAll(c, `\\${c}`);
  });
  if (parseQueryString) {
    characters.forEach((c) => {
      querystring = querystring.replaceAll(c, `\\${c}`);
    });
  }
  return `${pathname}${querystring.length ? '\\?' : ''}${querystring}`;
};

export const EMAIL_FORMAT = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+';

export const DEFAULT_GET = {
  credentials: 'include',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_POST = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_DELETE = {
  method: 'DELETE',
  credentials: 'include',
};

export const DEFAULT_PATCH = {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

export const DEFAULT_PUT = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

export const getItemById = (items: MockItem[], id?: string) =>
  items.find(({ id: thisId }) => id === thisId);

export const getMemberById = (members: Member[], id: string) =>
  members.find(({ id: thisId }) => id === thisId);

export const getRootPublishedItems = (items: MockItem[]) =>
  items.filter(
    ({ publishedInfo, path }) =>
      publishedInfo?.isPublished && publishedInfo?.rootPath === path,
  );
