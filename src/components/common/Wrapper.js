/* eslint-disable react/jsx-props-no-spreading */
import { ErrorBoundary } from '@sentry/react';
import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { Divider, ThemeProvider } from '@mui/material';

import { LIBRARY } from '@graasp/translations';
import '@graasp/ui/dist/bundle.css';

import defaultTheme from '../../config/theme';
import { QueryClientProvider } from '../QueryClientContext';
import Footer from '../layout/Footer';
import { LoginModalProvider } from './SignInModalContext';
import TranslationWrapper from './TranslationWrapper';

const Content = ({ children }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}>
      <LoginModalProvider>
        {children}
        {/* divider for placeholder at bottom to prevent item be covered by footer, set color to white */}
        <Divider mt={10} />
        <Footer />
      </LoginModalProvider>
    </ErrorBoundary>
  );
};

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

const Wrapper = ({ dehydratedState, children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  React.useEffect(async () => {
    if (typeof window !== 'undefined') {
      setTheme((await import('@graasp/ui')).theme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ flexGrow: 1, height: '100%' }}>
        <QueryClientProvider dehydratedState={dehydratedState}>
          <TranslationWrapper>
            <Content>{children}</Content>
          </TranslationWrapper>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
};

export default Wrapper;
