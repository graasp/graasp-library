import { ErrorBoundary } from '@sentry/react';
import PropTypes from 'prop-types';

import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { Divider, makeStyles } from '@material-ui/core';

import { getLangCookie } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import i18n from '../../config/i18n';
import { QueryClientProvider } from '../QueryClientContext';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { LoginModalProvider } from './SignInModalContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  divider: {
    marginTop: theme.spacing(10),
    // divider for placeholder at bottom to prevent item be covered by footer, set color to white
    backgroundColor: '#FFF',
  },
}));

const Content = ({ children }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <ErrorBoundary fallback={t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}>
      <LoginModalProvider>
        <Header />
        {children}
        <Divider className={classes.divider} />
        <Footer />
      </LoginModalProvider>
    </ErrorBoundary>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

const Wrapper = ({ dehydratedState, children }) => {
  const classes = useStyles();

  React.useEffect(() => {
    // change language
    const lang = getLangCookie();
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <div className={classes.root}>
      <QueryClientProvider dehydratedState={dehydratedState}>
        <I18nextProvider i18n={i18n}>
          <Content>{children}</Content>
        </I18nextProvider>
      </QueryClientProvider>
    </div>
  );
};

Wrapper.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
};

export default Wrapper;
