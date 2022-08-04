import { ErrorBoundary } from '@sentry/react';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { Divider, makeStyles } from '@material-ui/core';

import { LIBRARY } from '@graasp/translations';

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

function Wrapper({ dehydratedState, children }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}>
      <div className={classes.root}>
        <QueryClientProvider dehydratedState={dehydratedState}>
          <LoginModalProvider>
            <Header />
            {children}
            <Divider className={classes.divider} />
            <Footer />
          </LoginModalProvider>
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

Wrapper.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
};

export default Wrapper;
