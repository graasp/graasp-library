import { DOMAIN } from './constants';
import { GRAASP_API_HOST } from './env';
import notifier from './notifier';

// eslint-disable-next-line import/prefer-default-export
export const QUERY_CLIENT_OPTIONS = {
  API_HOST: GRAASP_API_HOST,
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
};
