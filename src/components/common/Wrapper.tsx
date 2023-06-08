import { ErrorBoundary } from '@sentry/react';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DehydratedState } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Divider, ThemeProvider, createTheme } from '@mui/material';

import { LIBRARY } from '@graasp/translations';
import '@graasp/ui/dist/bundle.css';

import { WRAPPER_SCROLLABLE_PAGE_BODY_ID } from '../../config/selectors';
import { QueryClientProvider } from '../QueryClientContext';
import Footer from '../layout/Footer';
import { LoginModalProvider } from './SignInModalContext';
import TranslationWrapper from './TranslationWrapper';

const Content = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}>
      <LoginModalProvider>
        {children}
        {/* divider for placeholder at bottom to prevent item be covered by footer, set color to white */}
        <Divider sx={{ mt: 10 }} />
        <Footer />
      </LoginModalProvider>
    </ErrorBoundary>
  );
};

const Wrapper = ({
  dehydratedState,
  children,
}: {
  children: JSX.Element;
  dehydratedState: DehydratedState;
}) => {
  const [theme, setTheme] = useState(createTheme());

  React.useEffect(() => {
    const setupTheme = async () => {
      if (typeof window !== 'undefined') {
        setTheme((await import('@graasp/ui')).theme);
      }
    };
    setupTheme();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ flexGrow: 1, height: '100%' }}
        id={WRAPPER_SCROLLABLE_PAGE_BODY_ID}
      >
        <QueryClientProvider dehydratedState={dehydratedState}>
          <TranslationWrapper>
            <Content>{children}</Content>
          </TranslationWrapper>
        </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
};

export default Wrapper;
