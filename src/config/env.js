/* eslint-disable prefer-destructuring */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PUBLISHED_TAG_ID =
  publicRuntimeConfig.NEXT_PUBLIC_PUBLISHED_TAG_ID;
export const SENTRY_DSN = publicRuntimeConfig.NEXT_PUBLIC_SENTRY_DSN;
export const GRAASP_AUTH_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_AUTH_HOST;
export const GRAASP_API_HOST = publicRuntimeConfig.NEXT_PUBLIC_API_HOST;
export const GRAASP_PERFORM_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_PERFORM_HOST;
export const GRAASP_BUILDER_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_BUILDER_HOST;
export const GRAASP_ANALYTICS_HOST =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASP_ANALYTICS_HOST;
export const NODE_ENV = publicRuntimeConfig.NODE_ENV;
export const GA_MEASUREMENT_ID =
  publicRuntimeConfig.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const NEXT_PUBLIC_GRAASPER_ID =
  publicRuntimeConfig.NEXT_PUBLIC_GRAASPER_ID;
export const S3_FILES_HOST = publicRuntimeConfig.NEXT_PUBLIC_S3_FILES_HOST;
export const SHOW_NOTIFICATIONS =
  publicRuntimeConfig.NEXT_PUBLIC_SHOW_NOTIFICATIONS;
export const NEXT_PUBLIC_DOMAIN = publicRuntimeConfig.NEXT_PUBLIC_DOMAIN;
