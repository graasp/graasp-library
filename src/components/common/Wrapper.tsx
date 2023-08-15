import { ErrorBoundary } from '@sentry/nextjs';

import { useTranslation } from 'react-i18next';
import { DehydratedState } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Stack, SxProps } from '@mui/material';

import { LIBRARY } from '@graasp/translations';
import '@graasp/ui/dist/bundle.css';

import { WRAPPER_SCROLLABLE_PAGE_BODY_ID } from '../../config/selectors';
import { QueryClientProvider } from '../QueryClientContext';
import Footer from '../layout/Footer';
import TranslationWrapper from './TranslationWrapper';

const Content = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}>
      {children}
    </ErrorBoundary>
  );
};

const Wrapper = ({
  dehydratedState,
  children,
  sx,
}: {
  children: JSX.Element;
  dehydratedState: DehydratedState;
  sx?: SxProps;
}) => {
  return (
    <Stack
      direction="column"
      minHeight="100vh"
      boxSizing="border-box"
      id={WRAPPER_SCROLLABLE_PAGE_BODY_ID}
    >
      <QueryClientProvider dehydratedState={dehydratedState}>
        <TranslationWrapper>
          <Box flexGrow={1} sx={sx}>
            <Content>{children}</Content>
          </Box>
          <Footer />
        </TranslationWrapper>
      </QueryClientProvider>
    </Stack>
  );
};

export default Wrapper;
