export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

export const SENTRY_ENV = process.env.NEXT_PUBLIC_SENTRY_ENV;
export const GRAASP_AUTH_HOST = process.env.NEXT_PUBLIC_GRAASP_AUTH_HOST;
export const GRAASP_API_HOST =
  process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';
export const GRAASP_PLAYER_HOST =
  process.env.NEXT_PUBLIC_GRAASP_PERFORM_HOST || 'http://localhost:3112';
export const GRAASP_BUILDER_HOST =
  process.env.NEXT_PUBLIC_GRAASP_BUILDER_HOST || 'http://localhost:3111';
export const GRAASP_ANALYTICS_HOST =
  process.env.NEXT_PUBLIC_GRAASP_ANALYTICS_HOST || 'http://localhost:3113';
export const GRAASP_ACCOUNT_HOST =
  process.env.NEXT_PUBLIC_GRAASP_ACCOUNT_HOST || 'http://localhost:3114';
// eslint-disable-next-line prefer-destructuring
export const NODE_ENV = process.env.NODE_ENV;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GRAASPER_ID = process.env.NEXT_PUBLIC_GRAASPER_ID;
export const SHOW_NOTIFICATIONS =
  process.env.NEXT_PUBLIC_SHOW_NOTIFICATIONS === 'true' || false;

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? 'localhost';

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION;
const projectName = 'graasp-library';
export const SENTRY_RELEASE = `${projectName}@${APP_VERSION}`;
