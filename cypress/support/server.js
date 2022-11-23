import { StatusCodes } from 'http-status-codes';
import qs from 'querystring';

import { API_ROUTES } from '@graasp/query-client';
import { buildPathFromIds, isChildOf } from '@graasp/sdk';

import { ITEM_PUBLIC_TAG } from '../fixtures/itemTags';
import { MEMBERS } from '../fixtures/members';
import { PERMISSION_LEVELS, THUMBNAIL_EXTENSION } from './constants';
import {
  DEFAULT_GET,
  ID_FORMAT,
  getItemById,
  getMemberById,
  getRootPublishedItems,
  parseStringToRegExp,
} from './utils';

const {
  buildGetPublicItemsWithTag,
  buildGetChildrenRoute,
  buildGetPublicChildrenRoute,
  buildGetItemMembershipsForItemsRoute,
  buildGetItemRoute,
  buildGetMember,
  ITEMS_ROUTE,
  GET_CURRENT_MEMBER_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_OUT_ROUTE,
  buildGetMembersRoute,
  GET_CATEGORY_TYPES_ROUTE,
  buildGetCategoriesRoute,
  buildGetPublicItemMembershipsForItemsRoute,
  GET_OWN_ITEMS_ROUTE,
  buildGetPublicMembersRoute,
  buildGetPublicItemRoute,
  buildGetPublicMember,
  buildGetItemsInCategoryRoute,
  buildGetItemsByKeywordRoute,
  GET_FLAGS_ROUTE,
} = API_ROUTES;

const API_HOST = Cypress.env('API_HOST');
const AUTHENTICATION_HOST = Cypress.env('AUTHENTICATION_HOST');

const checkMembership = ({ item, currentMember }) => {
  // mock membership
  const creator = item?.creator;
  const haveMembership =
    creator === currentMember.id ||
    item.memberships?.find(({ memberId }) => memberId === currentMember.id);

  return haveMembership;
};

const checkIsPublic = (item) => {
  const isPublic = item?.tags?.find(
    ({ tagId }) => tagId === ITEM_PUBLIC_TAG.id,
  );
  if (!isPublic) {
    return { statusCode: StatusCodes.UNAUTHORIZED };
  }
  return {};
};

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetOwnItems = ({ items, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${GET_OWN_ITEMS_ROUTE}`,
    },
    ({ reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }
      const own = items.filter(
        ({ creator, path }) =>
          creator === currentMember.id && !path.includes('.'),
      );
      return reply(own);
    },
  ).as('getOwnItems');
};

export const mockGetCurrentMember = (
  currentMember = MEMBERS.ANNA,
  shouldThrowError = false,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${GET_CURRENT_MEMBER_ROUTE}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }

      // might reply empty user when signed out
      return reply({ statusCode: StatusCodes.OK, body: currentMember });
    },
  ).as('getCurrentMember');
};

export const mockGetAvatar = ({ members, currentMember }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/members/avatars/${ID_FORMAT}\\?size\\=small`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const [link, querystrings] = url.split('?');
      const id = link.slice(API_HOST.length).split('/')[3];
      const { size } = qs.parse(querystrings);

      const { thumbnails } = members.find(({ id: thisId }) => id === thisId);
      if (!thumbnails) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      return reply({
        fixture: `${thumbnails}/${size}`,
        headers: { 'content-type': THUMBNAIL_EXTENSION },
      });
    },
  ).as('downloadAvatar');
};

export const mockGetItem = ({ items, currentMember }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemRoute(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const paras = url.slice(API_HOST.length).split('/')[2].split('?');
      const itemId = paras[0];
      const item = getItemById(items, itemId);

      // item does not exist in db
      if (!item) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const hasAccess = checkMembership({ item, currentMember });
      if (!hasAccess) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply({
        body: item,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getItem');
};

export const mockGetPublicItem = ({ items }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetPublicItemRoute(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const paras = url.slice(API_HOST.length).split('/')[3].split('?');
      const itemId = paras[0];
      const item = getItemById(items, itemId);

      // item does not exist in db
      if (!item) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      if (!checkIsPublic(item)) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply({
        body: item,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getPublicItem');
};

export const mockGetItemThumbnail = (
  { items, currentMember },
  shouldThrowError,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${ITEMS_ROUTE}/thumbnails/${ID_FORMAT}\\?size\\=medium`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const [link, querystrings] = url.split('?');
      const id = link.slice(API_HOST.length).split('/')[3];
      const { size } = qs.parse(querystrings);

      const item = items.find(({ id: thisId }) => id === thisId);

      const hasAccess = checkMembership({ item, currentMember });
      if (!hasAccess) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const { thumbnails } = item;
      if (!thumbnails) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      return reply({
        fixture: `${thumbnails}/${size}`,
        headers: { 'content-type': THUMBNAIL_EXTENSION },
      });
    },
  ).as('downloadItemThumbnail');
};

export const mockGetChildren = ({ items, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetChildrenRoute(ID_FORMAT)}`),
    },
    ({ url, reply }) => {
      const id = url.slice(API_HOST.length).split('/')[2];
      const item = getItemById(items, id);

      if (!checkMembership({ item, currentMember })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const children = items.filter(({ path }) =>
        isChildOf(path, buildPathFromIds(id)),
      );
      return reply(children);
    },
  ).as('getChildren');
};

export const mockGetPublicChildren = ({ items }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetPublicChildrenRoute(ID_FORMAT)}`),
    },
    ({ url, reply }) => {
      const id = url.slice(API_HOST.length).split('/')[3];
      const item = items.find(({ id: thisId }) => id === thisId);

      if (!checkIsPublic(item)) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const children = items.filter(({ path }) =>
        isChildOf(path, buildPathFromIds(id)),
      );
      return reply(children);
    },
  ).as('getPublicChildren');
};

export const mockGetMember = ({ members, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetMember(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const memberId = url.slice(API_HOST.length).split('/')[2];
      const member = getMemberById(members, memberId);

      // member does not exist in db
      if (!member) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: member,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMember');
};

export const mockGetPublicMember = ({ members }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetPublicMember(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const memberId = url.slice(API_HOST.length).split('/')[3];
      const member = getMemberById(members, memberId);

      // member does not exist in db
      if (!member) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: member,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getPublicMember');
};

export const mockGetMembers = ({ members, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(buildGetMembersRoute(['']))}`,
      ),
    },
    ({ url, reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      let { id: memberIds } = qs.parse(url.slice(url.indexOf('?') + 1));
      if (typeof memberIds === 'string') {
        memberIds = [memberIds];
      }
      const allMembers = memberIds?.map((id) => getMemberById(members, id));
      // member does not exist in db
      if (!allMembers) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: allMembers,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMembers');
};

export const mockGetPublicMembers = ({ members }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(buildGetPublicMembersRoute(['']))}`,
      ),
    },
    ({ url, reply }) => {
      let { id: memberIds } = qs.parse(url.slice(url.indexOf('?') + 1));
      if (typeof memberIds === 'string') {
        memberIds = [memberIds];
      }
      const allMembers = memberIds?.map((id) => getMemberById(members, id));
      // member does not exist in db
      if (!allMembers) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: allMembers,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getPublicMembers');
};

export const mockSignInRedirection = () => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${AUTHENTICATION_HOST}/${SIGN_IN_ROUTE}`,
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signInRedirection');
};

export const mockSignOut = () => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(SIGN_OUT_ROUTE),
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signOut');
};

export const mockGetCategoryTypes = (categoryTypes) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(GET_CATEGORY_TYPES_ROUTE)}$`,
      ),
    },
    ({ reply }) => {
      reply(categoryTypes);
    },
  ).as('getCategoryTypes');
};

export const mockGetCategories = (categories, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(buildGetCategoriesRoute())}`,
      ),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
        return;
      }
      reply(categories);
    },
  ).as('getCategories');
};

export const mockGetItemCategories = (
  { items, currentMember },
  shouldThrowError,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/items/${ID_FORMAT}/categories`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const itemId = url.slice(API_HOST.length).split('/')[2];
      const item = items.find(({ id }) => id === itemId);

      if (!checkMembership({ item, currentMember })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply(item?.categories || []);
    },
  ).as('getItemCategories');
};

export const mockGetPublicItemCategories = ({ items }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/p/items/${ID_FORMAT}/categories`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const itemId = url.slice(API_HOST.length).split('/')[3];
      const item = items.find(({ id }) => id === itemId);

      if (!checkIsPublic({ item })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply(item?.categories || []);
    },
  ).as('getPublicItemCategories');
};

export const mockGetPublishedItemsInCategories = (
  { items },
  shouldThrowError,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(buildGetItemsInCategoryRoute())}`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
      }
      let { categoryId: ids } = qs.parse(url.split('?')[1]);
      ids = Array.isArray(ids) ? ids : [ids];
      const publishedItems = getRootPublishedItems(items);
      const result = publishedItems.filter(({ categories }) =>
        categories?.find(({ categoryId: cId }) => ids.includes(cId)),
      );
      return reply(result);
    },
  ).as('getPublishedItemsInCategories');
};

export const mockGetPublicItemsWithTags = ({ items }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetPublicItemsWithTag({ tagId: '' }),
        )}`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
      }

      const tagId = qs.parse(url.split('?')[1])?.tagId;
      const result = items.filter((item) =>
        item?.tags?.find(
          ({ tagId: tId, itemPath }) => tagId === tId && itemPath === item.path,
        ),
      );
      return reply(result);
    },
  ).as('getPublicItemsWithTags');
};

export const mockGetItemMembershipsForItem = ({ items, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetItemMembershipsForItemsRoute([]),
        )}`,
      ),
    },
    ({ reply, url }) => {
      const { itemId } = qs.parse(url.slice(url.indexOf('?') + 1));
      const selectedItems = items.filter(({ id }) => itemId.includes(id));
      const allMemberships = selectedItems.map(
        ({ creator, id, memberships }) => {
          // build default membership depending on current member
          // if the current member is the creator, it has membership
          // otherwise it should return an error
          const defaultMembership =
            creator === currentMember?.id
              ? [
                  {
                    permission: PERMISSION_LEVELS.ADMIN,
                    memberId: creator,
                    itemId: id,
                  },
                ]
              : { statusCode: StatusCodes.UNAUTHORIZED };

          // if the defined memberships does not contain currentMember, it should throw
          const currentMemberHasMembership = memberships?.find(
            ({ memberId }) => memberId === currentMember?.id,
          );
          if (!currentMemberHasMembership) {
            return defaultMembership;
          }

          return memberships || defaultMembership;
        },
      );
      reply(allMemberships);
    },
  ).as('getItemMemberships');
};

export const mockGetPublicItemMembershipsForItem = ({ items }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetPublicItemMembershipsForItemsRoute([]),
        )}`,
      ),
    },
    ({ reply, url }) => {
      const { itemId } = qs.parse(url.slice(url.indexOf('?') + 1));
      const parentItem = items.filter(({ id }) => itemId === id);

      if (!checkIsPublic(parentItem)) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const selectedItems = items.filter(({ id }) => itemId.includes(id));
      const allMemberships = selectedItems.map(
        ({ creator, id, memberships }) => {
          // build default membership depending on creator
          const defaultMembership = [
            {
              permission: PERMISSION_LEVELS.ADMIN,
              memberId: creator,
              itemId: id,
            },
          ];

          return memberships || defaultMembership;
        },
      );
      return reply(allMemberships);
    },
  ).as('getPublicItemMemberships');
};

export const mockGetFlags = ({ flags, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${parseStringToRegExp(GET_FLAGS_ROUTE)}$`),
    },
    ({ reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }
      return reply(flags);
    },
  ).as('getFlags');
};

// this mock only returns what is set in setup
export const mockSearch = ({ searchResultItems }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemsByKeywordRoute('.*', '.*')}`),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }

      return reply(searchResultItems);
    },
  ).as('search');
};

export const mockGetLikedItems = ({ itemLikes }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/items/${ID_FORMAT}/likes`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const currentUserId = url.slice(API_HOST.length).split('/')[2];
      const results = itemLikes.filter(
        ({ memberId }) => memberId === currentUserId,
      );

      return reply(results || []);
    },
  ).as('getLikedItems');
};
