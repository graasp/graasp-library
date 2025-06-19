/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';

import * as Sentry from '@sentry/tanstackstart-react';
import { StartClient } from '@tanstack/react-start';

import { createRouter } from './router';

const router = createRouter();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

hydrateRoot(document, <StartClient router={router} />);
