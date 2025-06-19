import * as Sentry from '@sentry/tanstackstart-react';
import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest,
} from '@tanstack/react-start/server';
import { polyfill } from 'interweave-ssr';

import { APP_VERSION } from './config/env';
import { overwriteGetLocale } from './paraglide/runtime';
import { paraglideMiddleware } from './paraglide/server';
import { createRouter } from './router';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: `graasp-library@${APP_VERSION}`,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

// interweave polyfill
polyfill();

// we need to change a bit how the ssr endpoint is handled in order to inject the paraglideJS middleware for i18n
export default createStartHandler({
  createRouter,
})((event) =>
  paraglideMiddleware(getWebRequest(), ({ locale }) => {
    overwriteGetLocale(() => locale);
    return Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler(event));
  }),
);
