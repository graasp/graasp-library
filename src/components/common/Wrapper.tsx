import { ErrorBoundary } from '@sentry/nextjs';

import { Trans } from 'react-i18next';
import type { DehydratedState } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import { Box, Stack, SxProps } from '@mui/material';

import '@graasp/ui/dist/bundle.css';

import { useLibraryTranslation } from '../../config/i18n';
import { WRAPPER_SCROLLABLE_PAGE_BODY_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientProvider } from '../QueryClientContext';
import Footer from '../layout/Footer';
import TranslationWrapper from './TranslationWrapper';

const Content = ({ children }: { children: JSX.Element }) => {
  const { t } = useLibraryTranslation();

  return (
    <ErrorBoundary
      fallback={<Trans t={t} i18nKey={LIBRARY.UNEXPECTED_ERROR_MESSAGE} />}
    >
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
