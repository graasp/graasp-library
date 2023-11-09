import { Context } from '@graasp/sdk';

import {
  GRAASP_ANALYTICS_HOST,
  GRAASP_AUTH_HOST,
  GRAASP_BUILDER_HOST,
  GRAASP_PLAYER_HOST,
} from './env';

export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signin`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signup`;

export const buildPlayerViewItemRoute = (id = ':id') =>
  `${GRAASP_PLAYER_HOST}/${id}`;

export const HOST_MAP = {
  [Context.Builder]: GRAASP_BUILDER_HOST,
  [Context.Library]: '/',
  [Context.Analytics]: GRAASP_ANALYTICS_HOST,
  [Context.Player]: GRAASP_PLAYER_HOST,
};
