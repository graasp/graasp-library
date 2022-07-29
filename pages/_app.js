import React from 'react';
import ReactGa from 'react-ga';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  APP_VERSION,
  SENTRY_DSN,
  GOOGLE_ANALYTICS_ID,
} from '../src/config/env';
import i18nConfig from '../src/config/i18n';
import WHITELISTED_ERRORS from '../src/config/errors';
import { APP_NAME } from '../src/config/constants';
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
  release: `${APP_NAME} ${APP_VERSION}`,
});

// set up google analytics
if (typeof window !== 'undefined') {
  ReactGa.initialize(GOOGLE_ANALYTICS_ID);
  ReactGa.pageview(window.location.href);
}

export default function GraaspLibraryApp(props) {
  const { Component, pageProps } = props;

  // Remove the server-side injected CSS.
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <I18nextProvider i18n={i18nConfig}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </MuiThemeProvider>
      </I18nextProvider>
    </>
  );
}

GraaspLibraryApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
