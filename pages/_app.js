import * as Sentry from '@sentry/react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import ReactGa from 'react-ga';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { DEFAULT_LANG } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import {
  APP_VERSION,
  GOOGLE_ANALYTICS_ID,
  SENTRY_DSN,
} from '../src/config/env';
import WHITELISTED_ERRORS from '../src/config/errors';
import i18n from '../src/config/i18n';
import theme from '../src/config/theme';

// set up sentry
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
  release: `${i18n.t(LIBRARY.GRAASP_LIBRARY, {
    lng: DEFAULT_LANG,
  })} ${APP_VERSION}`,
});

// set up google analytics
if (typeof window !== 'undefined') {
  ReactGa.initialize(GOOGLE_ANALYTICS_ID);
  ReactGa.pageview(window.location.href);
}

export default function GraaspLibraryApp(props) {
  const { Component, pageProps } = props;

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <ToastContainer theme="colored" />
      </MuiThemeProvider>
    </>
  );
}

GraaspLibraryApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
