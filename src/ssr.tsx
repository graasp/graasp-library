import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
  defineEventHandler,
} from '@tanstack/react-start/server';
import { polyfill } from 'interweave-ssr';
import { getWebRequest } from 'vinxi/http';

import { paraglideMiddleware } from '~/paraglide/server.js';

import { createRouter } from './router';

// interweave polyfill
polyfill();
// we need to change a bit how the ssr endpoint is handled in order to inject the paraglideJS middleware for i18n
export default defineEventHandler((event) =>
  paraglideMiddleware(getWebRequest(event), async () =>
    createStartHandler({
      createRouter,
      getRouterManifest,
    })(defaultStreamHandler)(event),
  ),
);
