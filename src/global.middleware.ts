import * as Sentry from '@sentry/tanstackstart-react';
import {
  createMiddleware,
  registerGlobalMiddleware,
} from '@tanstack/react-start';

import { localeMiddleware } from './utils/locale-middleware';

registerGlobalMiddleware({
  middleware: [localeMiddleware],
});

registerGlobalMiddleware({
  middleware: [
    localeMiddleware,
    createMiddleware().server(Sentry.sentryGlobalServerMiddlewareHandler()),
  ],
});
