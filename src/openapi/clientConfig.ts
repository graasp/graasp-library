import type { CreateClientConfig } from '@hey-api/client-fetch';

import { API_HOST } from '../config/env';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_HOST,
  credentials: 'include',
});
