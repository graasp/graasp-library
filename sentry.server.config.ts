// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

import { SENTRY_DSN, SENTRY_ENV, SENTRY_RELEASE } from './src/config/env';

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  release: SENTRY_RELEASE,
  environment: SENTRY_ENV,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
