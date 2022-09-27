/* eslint-disable react/jsx-props-no-spreading */
import * as Sentry from '@sentry/react';
import Head from 'next/head';

import React, { useEffect } from 'react';
import ReactGa from 'react-ga';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { GOOGLE_ANALYTICS_ID, SENTRY_DSN } from '../src/config/env';
import WHITELISTED_ERRORS from '../src/config/errors';
import theme from '../src/config/theme';

// set up sentry
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    ...WHITELISTED_ERRORS,
    beforeSend(event) {
      // check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
    release: `${process.env.NEXT_PUBLIC_APP_NAME}@v${process.env.NEXT_PUBLIC_APP_VERSION}`,
  });
}

// set up google analytics
if (typeof window !== 'undefined') {
  ReactGa.initialize(GOOGLE_ANALYTICS_ID);
  ReactGa.pageview(window.location.href);
}

type Props = {
  Component: React.ComponentClass;
  pageProps: any;
};

export default function GraaspLibraryApp(props: Props) {
  const { Component, pageProps } = props;

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Graasp Library</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <Component {...pageProps} />
        <ToastContainer theme="colored" />
      </MuiThemeProvider>
    </>
  );
}
