import React from 'react';
import { ToastContainer } from 'react-toastify';

import {
  Box,
  CssBaseline,
  GlobalStyles,
  Stack,
  ThemeProvider,
} from '@mui/material';

import rtlPlugin from '@graasp/stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import fontsourceVariableNunitoCss from '@fontsource-variable/nunito?url';
import { wrapCreateRootRouteWithSentry } from '@sentry/tanstackstart-react';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import katexCSS from 'katex/dist/katex.min.css?url';
import { prefixer } from 'stylis';

import { Header } from '~/components/Header';
import ErrorComponent from '~/components/common/Error';
import Footer from '~/components/layout/Footer';
import { createGraaspTheme } from '~/components/ui/theme';
import { getClientOriginFn, getCurrentLocationFn } from '~/lib/routes';
import { getLocale } from '~/paraglide/runtime';
import { getDirectionFromLocale } from '~/utils/locale';

export const Route = wrapCreateRootRouteWithSentry(
  createRootRouteWithContext<{ queryClient: QueryClient }>,
)()({
  head: () => ({
    meta: [
      { title: 'Graasp Library' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-96x96.png',
        sizes: '96x96',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'stylesheet', href: fontsourceVariableNunitoCss },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css',
      },
      { rel: 'stylesheet', href: katexCSS },
    ],
  }),
  loader: async () => {
    const clientOrigin = await getClientOriginFn();
    const currentLocation = await getCurrentLocationFn();
    return { clientOrigin, currentLocation };
  },
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({
  children,
  direction,
}: Readonly<{ children: React.ReactNode; direction: 'rtl' | 'ltr' }>) {
  const emotionCache = createCache({
    key: 'css',
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider
        theme={createGraaspTheme({
          direction,
        })}
      >
        <CssBaseline />
        {import.meta.env.MODE === 'test' && (
          // small transition override used to make testing more stable
          <GlobalStyles styles={{ html: { transition: 'none !important' } }} />
        )}
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { clientOrigin } = Route.useLoaderData();
  const direction = getDirectionFromLocale(getLocale());

  return (
    <html lang={getLocale()} dir={direction}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers direction={direction}>
          <Stack minHeight="100vh">
            <Stack
              direction="column"
              // justifyItems="space-between"
              height="100%"
              flex={1}
            >
              <Header clientOrigin={clientOrigin} />
              <Box flex={1}>{children}</Box>
              <ToastContainer stacked theme="colored" position="bottom-left" />
              <Footer />
            </Stack>
          </Stack>
        </Providers>

        {import.meta.env.MODE === 'development' && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </>
        )}

        <Scripts />
      </body>
    </html>
  );
}
