import { GRAASP_API_HOST, S3_FILES_HOST } from './env';
import notifier from './notifier';

// eslint-disable-next-line import/prefer-default-export
export const QUERY_CLIENT_OPTIONS = {
  API_HOST: GRAASP_API_HOST,
  enableWebsocket: false,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  defaultQueryOptions: {
    staleTime: 1000, // ms
  },
  notifier,
  S3_FILES_HOST,
};
