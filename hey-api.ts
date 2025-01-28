import type { CreateClientConfig } from '@hey-api/client-fetch';

import { GRAASP_API_HOST } from './src/config/env';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: GRAASP_API_HOST,
});
