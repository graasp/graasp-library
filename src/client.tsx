/// <reference types="vite/client" />
import { hydrateRoot } from 'react-dom/client';

import * as Sentry from '@sentry/tanstackstart-react';
import { StartClient } from '@tanstack/react-start';

import { APP_VERSION } from './config/env';
import { createRouter } from './router';

const router = createRouter();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  release: `graasp-library@${APP_VERSION}`,
  integrations: [
    Sentry.tanstackRouterBrowserTracingIntegration(router),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

hydrateRoot(document, <StartClient router={router} />);
