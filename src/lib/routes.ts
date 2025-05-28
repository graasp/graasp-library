import { createServerFn } from '@tanstack/react-start';

import { CLIENT_HOST, CURRENT_HOST } from '~/config/env';

export const getClientOriginFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return CLIENT_HOST;
  },
);

export const getCurrentLocationFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    return CURRENT_HOST;
  },
);
