export const CLIENT_HOST =
  process.env.VITE_CLIENT_HOST ?? import.meta.env.VITE_CLIENT_HOST; // ?? 'http://localhost:3114';

export const CURRENT_HOST =
  process.env.VITE_CURRENT_HOST ?? import.meta.env.VITE_CURRENT_HOST; // ?? 'http://localhost:3114';
export const API_HOST =
  process.env.VITE_API_HOST ?? import.meta.env.VITE_API_HOST; // ?? 'http://localhost:3000';

// runtime env vars that should be accessed only on the server side
export const APP_VERSION = process.env.APP_VERSION ?? 'not-defined';
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP ?? 'not-defined';

export const SENTRY_RELEASE = `graasp-library@${APP_VERSION}`;
