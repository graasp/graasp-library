/* eslint-disable prefer-destructuring */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PUBLISHED_TAG_ID =
  publicRuntimeConfig.NEXT_PUBLIC_PUBLISHED_TAG_ID;
export const SENTRY_DSN = publicRuntimeConfig.NEXT_PUBLIC_SENTRY_DSN;
export const GOOGLE_ANALYTICS_ID =
  publicRuntimeConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const GRAASP_AUTH_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_AUTH_HOST;
export const GRAASP_API_HOST = publicRuntimeConfig.NEXT_PUBLIC_API_HOST;
export const GRAASP_PERFORM_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_PERFORM_HOST;
export const APP_VERSION = publicRuntimeConfig.APP_VERSION;
export const NODE_ENV = publicRuntimeConfig.NODE_ENV;
export const GRAASPER_ID = publicRuntimeConfig.GRAASPER_ID;
