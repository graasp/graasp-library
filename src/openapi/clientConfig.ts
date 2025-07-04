import { API_HOST } from '../config/env';
import type { CreateClientConfig } from './client/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_HOST,
  credentials: 'include',
});
