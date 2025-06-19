import * as Sentry from '@sentry/tanstackstart-react';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
  defineEventHandler,
} from '@tanstack/react-start/server';
import { polyfill } from 'interweave-ssr';
import { getWebRequest } from 'vinxi/http';

import { paraglideMiddleware } from '~/paraglide/server.js';

import { APP_VERSION } from './config/env';
import { createRouter } from './router';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: `graasp-library@${APP_VERSION}`,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

// interweave polyfill
polyfill();
// we need to change a bit how the ssr endpoint is handled in order to inject the paraglideJS middleware for i18n
export default defineEventHandler((event) =>
  paraglideMiddleware(getWebRequest(event), async () =>
    createStartHandler({
      createRouter,
      getRouterManifest,
    })(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler))(event),
  ),
);
