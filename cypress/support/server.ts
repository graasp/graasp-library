import { API_ROUTES } from '@graasp/query-client';
import {
  HttpMethod,
  ItemVisibilityType,
  MemberFactory,
  PermissionLevel,
  buildPathFromIds,
  isChildOf,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import { builderMeilisearchResults } from '../fixtures/items';
import { MockItem, MockItemLike, MockMember } from './types';
import {
  DEFAULT_GET,
  ID_FORMAT,
  getItemById,
  getMemberById,
  getRootPublishedItems,
} from './utils';

const {
  buildGetItemPublishedInformationRoute,
  buildGetItemRoute,
  buildGetMemberRoute,
  buildGetCurrentMemberRoute,
  ITEMS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_OUT_ROUTE,
  SEARCH_PUBLISHED_ITEMS_ROUTE,
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
    item.memberships?.find(({ account }) => account.id === currentMember?.id);
  const isPublic = item.visibility.find(
    (t) => t.type === ItemVisibilityType.Public,
  );
  return Boolean(haveMembership) || isPublic;
};

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetAccessibleItems = (items: MockItem[]): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      pathname: `/${ITEMS_ROUTE}/accessible`,
    },
    ({ url, reply }) => {
      const params = new URL(url).searchParams;

      const page = parseInt(params.get('page') ?? '1', 10);
      const pageSize = parseInt(params.get('pageSize') ?? '10', 10);

      // warning: we don't check memberships
      const root = items.filter((i) => !i.path.includes('.'));

      // todo: filter

      const result = root.slice((page - 1) * pageSize, page * pageSize);

      reply({ data: result, pagination: { page, pageSize } });
    },
  ).as('getAccessibleItems');
};

export const mockGetRecentCollections = (
  recentCollections: MockItem[],
): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      pathname: `/${ITEMS_ROUTE}/collections/recent`,
    },
    ({ reply }) => {
      reply({ hits: recentCollections });
    },
  ).as('getRecentCollections');
};

export const mockGetCurrentMember = (
  currentMember?: MockMember,
  shouldThrowError = false,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
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
  { members }: { members: MockMember[] },
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

      const memberId = new URL(url).pathname.split('/')[2];
      const thumbnail = members.find(({ id }) => id === memberId)?.thumbnail;
      if (!thumbnail) {
        return reply({ statusCode: StatusCodes.NO_CONTENT });
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
      url: new RegExp(`${API_HOST}/${buildGetMemberRoute(ID_FORMAT)}*`),
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

export const mockGetTagsByItem = ({ items }: { items: MockItem[] }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/items/${ID_FORMAT}/tags`),
    },
    ({ reply, url }) => {
      const itemId = new URL(url).pathname.split('/')[2];
      const item = items.find(({ id }) => id === itemId);

      if (!item) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      return reply(item.tags as any);
    },
  ).as('getTagsByItem');
};

export const mockGetItemMembershipsForItem = ({
  items,
}: {
  items: MockItem[];
  currentMember?: MockMember;
}) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/item-memberships`),
    },
    ({ reply, url }) => {
      const itemId = new URLSearchParams(new URL(url).search).get('itemId');

      const item = items.find((i) => i.id === itemId);
      if (!item) {
        reply({ statusCode: StatusCodes.NOT_FOUND });
        return;
      }
      if (!item.creator) {
        reply({ statusCode: StatusCodes.NOT_FOUND });
        return;
      }
      // build default membership depending on current member
      // if the current member is the creator, it has membership
      // otherwise it should return an error
      const defaultMembership = {
        id: v4(),
        item,
        permission: PermissionLevel.Admin,
        account: MemberFactory(item.creator),
      };
      const itemMemberships =
        item.memberships?.map(({ account, permission }) => ({
          id: v4(),
          item,
          permission,
          account,
        })) || [];
      const creatorHasMembership = item.memberships?.find(
        (m) => m.account?.id === item.creator?.id,
      );
      if (!creatorHasMembership) {
        itemMemberships.push(defaultMembership);
      }
      reply(itemMemberships);
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
      method: HttpMethod.Post,
      url: new RegExp(`${API_HOST}/${SEARCH_PUBLISHED_ITEMS_ROUTE}`),
    },
    ({ reply, body }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }
      if (body.isPublishedRoot) {
        return reply(
          builderMeilisearchResults(getRootPublishedItems(searchResultItems)),
        );
      }

      return reply(builderMeilisearchResults(searchResultItems));
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
      const results =
        itemLikes.filter(({ creator }) => creator?.id === memberId) ?? [];

      return reply(results);
    },
  ).as('getLikedItemsForMember');
};

export const mockGetPublishItemInformations = (items: MockItem[]): void => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: new RegExp(
        `${API_HOST}/${buildGetItemPublishedInformationRoute(ID_FORMAT)}`,
      ),
    },
    ({ reply, url }) => {
      const itemId = url.slice(API_HOST.length).split('/')[3];
      const item = items.find((i) => i?.id === itemId);
      if (!item?.publishedInfo?.isPublished) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }
      return reply({ item });
    },
  ).as('getPublishItemInformations');
};

export const mockCopyItems = (): void => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      url: new RegExp(`${API_HOST}/items/copy\\?id\\=`),
    },
    ({ reply }) => {
      // todo: do for all children
      return reply({
        statusCode: StatusCodes.ACCEPTED,
      });
    },
  ).as('copyItems');
};
