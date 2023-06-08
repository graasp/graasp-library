import { Context } from '@graasp/sdk';

import {
  GRAASP_ANALYTICS_HOST,
  GRAASP_AUTH_HOST,
  GRAASP_BUILDER_HOST,
  GRAASP_PLAYER_HOST,
} from './env';

export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signin`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signup`;
export const MEMBER_PROFILE_ROUTE = `${GRAASP_BUILDER_HOST}/profile`;

export const buildPlayerViewItemRoute = (id = ':id') =>
  `${GRAASP_PLAYER_HOST}/${id}`;

export const HOST_MAP = {
  [Context.BUILDER]: GRAASP_BUILDER_HOST,
  [Context.LIBRARY]: '/',
  [Context.ANALYTICS]: GRAASP_ANALYTICS_HOST,
  [Context.PLAYER]: GRAASP_PLAYER_HOST,
};
