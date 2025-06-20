import { ClientManager, Context } from '@graasp/sdk';

import { CLIENT_HOST } from './env';

const clientManager = ClientManager.getInstance().setHost(CLIENT_HOST);
export const LOGIN_ROUTE_URL = clientManager.getURLByContext(
  Context.Auth,
  'login',
);
export const REGISTER_ROUTE = clientManager
  .getURLByContext(Context.Auth, 'register')
  .toString();
export const CLIENT_HOME_ROUTE = clientManager
  .getURLByContext(Context.Home)
  .toString();

export const buildPlayerViewItemRoute = (id = ':id') =>
  clientManager.getItemLink(Context.Auth, id);

export const publicProfileAccountPath = clientManager
  .getURLByContext(Context.Account, 'settings')
  .toString();
