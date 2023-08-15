/* eslint-disable react/jsx-props-no-spreading */
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@mui/material/CssBaseline';

import { hasAcceptedCookies } from '@graasp/sdk';

import { ENV, UrlSearch } from '../src/config/constants';
import createEmotionCache from '../src/config/createEmotionCache';
import { GA_MEASUREMENT_ID, NODE_ENV } from '../src/config/env';
import { theme } from '../src/config/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const GraaspLibraryApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      // REACTGA
      // Send pageview with a custom path
      if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== ENV.TEST) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        ReactGA.send('pageview');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // remove cross domain tracking query params
    const { pathname, query } = router;
    const params = new URLSearchParams(query as Record<string, string>);
    params.delete(UrlSearch.GACrossDomainKey);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Graasp Library</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <Component {...pageProps} />
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </CacheProvider>
  );
};
export default GraaspLibraryApp;
