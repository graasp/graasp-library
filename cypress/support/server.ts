import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import { API_ROUTES } from '@graasp/query-client';
import {
  Category,
  ItemTagType,
  PermissionLevel,
  buildPathFromIds,
  isChildOf,
} from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import {
  MockItem,
  MockItemCategory,
  MockItemLike,
  MockItemMembership,
  MockMember,
} from './types';
import {
  DEFAULT_GET,
  ID_FORMAT,
  getItemById,
  getMemberById,
  getRootPublishedItems,
  parseStringToRegExp,
} from './utils';

const {
  buildGetItemMembershipsForItemsRoute,
  buildGetItemRoute,
  buildGetItemTagsRoute,
  buildGetMember,
  ITEMS_ROUTE,
  GET_CURRENT_MEMBER_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_OUT_ROUTE,
  buildGetMembersRoute,
  buildGetCategoriesRoute,
  GET_OWN_ITEMS_ROUTE,
  buildGetItemsByKeywordRoute,
} = API_ROUTES;

const API_HOST = Cypress.env('API_HOST');
const AUTHENTICATION_HOST = Cypress.env('AUTHENTICATION_HOST');

const checkMembership = ({
  item,
  currentMember,
}: {
  item: MockItem;
  currentMember?: MockMember;
}) => {
  // mock membership
  const creatorId = item?.creator?.id;
  const haveMembership =
    creatorId === currentMember?.id ||
    item.memberships?.find(({ member }) => member.id === currentMember?.id);
  const isPublic = item.tags.find((t) => t.type === ItemTagType.Public);
  return Boolean(haveMembership) || isPublic;
};

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetAllPublishedItems = (
  { items }: { items: MockItem[] },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${ITEMS_ROUTE}/collections`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
      }
      const categoryIds = new URLSearchParams(new URL(url).search).getAll(
        'categoryId',
      );

      // this does not account for the OR and AND syntax
      const publishedItems = getRootPublishedItems(items);
      const result = publishedItems.filter(({ categories }) => {
        if (categoryIds.length) {
          return categories?.some(({ category }) =>
            categoryIds.includes(category.id),
          );
        }
        return true;
      });
      return reply(result);
    },
  ).as('getAllPublishedItems');
};

export const mockGetOwnItems = ({
  items,
  currentMember,
}: {
  items: MockItem[];
  currentMember?: MockMember;
}) => {
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
          creator?.id === currentMember.id && !path.includes('.'),
      );
      return reply(own);
    },
  ).as('getOwnItems');
};

export const mockGetCurrentMember = (
  currentMember?: MockMember,
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

export const mockGetAvatarUrl = (
  {
    members,
    currentMember,
  }: { members: MockMember[]; currentMember?: MockMember },
  shouldThrowError?: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/members/${ID_FORMAT}/avatar/small\\?replyUrl\\=true`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const id = new URL(url).pathname.split('/')[2];
      const thumbnail = members.find(({ id: thisId }) => id === thisId)
        ?.thumbnail;
      if (!thumbnail) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      // todo: return url
      return reply(thumbnail);
    },
  ).as('downloadAvatar');
};

export const mockGetItem = (
  { items, currentMember }: { items: MockItem[]; currentMember?: MockMember },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemRoute(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const itemId = url.split('/').at(-1);

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

export const mockGetItemTags = (
  { tags }: { tags: any[] },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemTagsRoute(ID_FORMAT)}$`),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply({
        body: tags,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getItemTags');
};

export const mockGetItemThumbnailUrl = (
  { items, currentMember }: { items: MockItem[]; currentMember?: MockMember },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${ITEMS_ROUTE}/${ID_FORMAT}/thumbnails`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }
      const id = new URL(url).pathname.split('/')[3];

      const item = items.find(({ id: thisId }) => id === thisId);

      if (!item) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      const hasAccess = checkMembership({ item, currentMember });
      if (!hasAccess) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const { thumbnail } = item;
      if (!thumbnail) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      return reply(thumbnail);
    },
  ).as('downloadItemThumbnail');
};

export const mockGetChildren = ({
  items,
  currentMember,
}: {
  items: MockItem[];
  currentMember?: MockMember;
}) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${ITEMS_ROUTE}/${ID_FORMAT}/children`),
    },
    ({ url, reply }) => {
      const id = new URL(url).pathname.split('/')[2];
      const item = getItemById(items, id);
      if (!item) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

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

export const mockGetMember = ({
  members,
  currentMember,
}: {
  members: MockMember[];
  currentMember?: MockMember;
}) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetMember(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const memberId = new URL(url).pathname.split('/')[2];
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

export const mockGetMembers = ({
  members,
  currentMember,
}: {
  members: MockMember[];
  currentMember?: MockMember;
}) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${buildGetMembersRoute([''])}*`,
    },
    ({ url, reply }) => {
      if (!currentMember) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const memberIds = new URLSearchParams(url).getAll('id');
      const result = {
        data: {} as { [key: string]: MockMember },
        errors: [] as { statusCode: number; name: string }[],
      };

      memberIds.forEach((id) => {
        const m = getMemberById(members, id);
        if (!m) {
          result.errors.push({
            statusCode: StatusCodes.NOT_FOUND,
            name: FAILURE_MESSAGES.MEMBER_NOT_FOUND,
          });
        } else {
          result.data[m.id] = m;
        }
      });
      return reply({
        body: result,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMembers');
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

export const mockGetCategories = (
  categories: Category[],
  shouldThrowError: boolean,
) => {
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
  { items, currentMember }: { items: MockItem[]; currentMember?: MockMember },
  shouldThrowError: boolean,
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

      const itemId = new URL(url).pathname.split('/')[2];
      const item = items.find(({ id }) => id === itemId);

      if (!item) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      if (!checkMembership({ item, currentMember })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }
      const itemCategories: MockItemCategory[] =
        item?.categories?.map(({ category }) => ({
          category,
          item,
          id: v4(),
        })) || [];
      return reply(itemCategories);
    },
  ).as('getItemCategories');
};

export const mockGetItemMembershipsForItems = ({
  items,
}: {
  items: MockItem[];
  currentMember?: MockMember;
}) => {
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
      const itemIds = new URLSearchParams(new URL(url).search).getAll('itemId');
      const selectedItems = items.filter(({ id }) => itemIds.includes(id));
      const allMemberships: {
        data: {
          [key: string]: MockItemMembership[];
        };
        errors: { statusCode: number }[];
      } = { data: {}, errors: [] };

      selectedItems.forEach(({ creator, id, memberships }) => {
        const item = selectedItems.find((i) => i.id === id);
        if (!item) {
          allMemberships.errors.push({ statusCode: StatusCodes.NOT_FOUND });
          return;
        }
        if (!creator) {
          allMemberships.errors.push({ statusCode: StatusCodes.NOT_FOUND });
          return;
        }
        // build default membership depending on current member
        // if the current member is the creator, it has membership
        // otherwise it should return an error
        const defaultMembership = {
          id: v4(),
          item,
          permission: PermissionLevel.Admin,
          member: creator,
        };
        const itemMemberships =
          memberships?.map(({ member, permission }) => ({
            id: v4(),
            item,
            permission,
            member,
          })) || [];
        const creatorHasMembership = memberships?.find(
          (m) => m.member?.id === creator?.id,
        );
        if (!creatorHasMembership) {
          itemMemberships.push(defaultMembership);
        }

        if (!itemMemberships?.length) {
          allMemberships.errors.push({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          });
        } else {
          allMemberships.data[id] = itemMemberships;
        }
      });
      reply(allMemberships);
    },
  ).as('getItemMemberships');
};

// this mock only returns what is set in setup
export const mockSearch = (
  { searchResultItems }: { searchResultItems: MockItem[] },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemsByKeywordRoute({})}`),
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

export const mockGetLikedItems = (
  { itemLikes }: { itemLikes: MockItemLike[] },
  shouldThrowError: boolean,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/items/liked`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const memberId = new URLSearchParams(new URL(url).search).get('memberId');
      const results = itemLikes.filter(
        ({ creator }) => creator?.id === memberId,
      );

      return reply(results || []);
    },
  ).as('getLikedItemsForMember');
};
