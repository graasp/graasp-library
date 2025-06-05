// FIXME: to be moved to the sentry specific files
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
export const SENTRY_ENV = import.meta.env.VITE_SENTRY_ENV;

export const CLIENT_HOST =
  process.env.VITE_CLIENT_HOST ?? import.meta.env.VITE_CLIENT_HOST; // ?? 'http://localhost:3114';

export const CURRENT_HOST =
  process.env.VITE_CURRENT_HOST ?? import.meta.env.VITE_CURRENT_HOST; // ?? 'http://localhost:3114';
export const API_HOST =
  process.env.VITE_API_HOST ?? import.meta.env.VITE_API_HOST; // ?? 'http://localhost:3000';

// FIXME: may be we should have a specific endpoint for the graasper collections so we do not rely on this env var
export const GRAASPER_ID = import.meta.env.VITE_GRAASPER_ID;

// TODO: NOT USED anymore, remove
export const SHOW_NOTIFICATIONS =
  import.meta.env.VITE_SHOW_NOTIFICATIONS === 'true' || false;

// runtime env vars that should be accessed only on the server side
export const APP_VERSION = process.env.VITE_APP_VERSION ?? 'not-defined';
export const BUILD_TIMESTAMP =
  process.env.VITE_BUILD_TIMESTAMP ?? 'not-defined';

export const SENTRY_RELEASE = `graasp-library@${APP_VERSION}`;
