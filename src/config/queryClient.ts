import { DOMAIN, GRAASP_API_HOST } from './env';
import notifier from './notifier';

// eslint-disable-next-line import/prefer-default-export
export const QUERY_CLIENT_OPTIONS = {
  API_HOST: GRAASP_API_HOST,
  // cannot be enabled because of ssr
  enableWebsocket: false,
  defaultQueryOptions: {
    keepPreviousData: true,
    refetchOnMount: false,
    // avoid refetching when same data are closely fetched
    staleTime: 1000, // ms
    cacheTime: 1000, // ms
  },
  DOMAIN,
  notifier,
  SHOW_NOTIFICATIONS: true,
  WS_HOST: `${GRAASP_API_HOST?.replace('http', 'ws')}/ws`,
};
