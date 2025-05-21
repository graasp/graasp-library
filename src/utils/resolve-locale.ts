import { createIsomorphicFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

import { Locale, baseLocale, getLocale } from '~/paraglide/runtime.js';
import { paraglideMiddleware } from '~/paraglide/server.js';

export const resolveLocale = createIsomorphicFn()
  .client(async () => getLocale())
  .server(async () => {
    const request = getWebRequest();

    if (!request) {
      return baseLocale;
    }

    return await new Promise<Locale>((resolve) =>
      paraglideMiddleware(request, async ({ locale }) => {
        resolve(locale);
      }),
    );
  });
