import * as Sentry from '@sentry/tanstackstart-react';
import {
  createMiddleware,
  registerGlobalMiddleware,
} from '@tanstack/react-start';

import { localeMiddleware } from './utils/locale-middleware';

registerGlobalMiddleware({
  middleware: [
    localeMiddleware,
    createMiddleware({ type: 'function' }).server(
      Sentry.sentryGlobalServerMiddlewareHandler(),
    ),
  ],
});
