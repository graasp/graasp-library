import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { Alert, Grid, Skeleton } from '@mui/material';

import { ErrorBoundary } from '@sentry/tanstackstart-react';

import { CollectionContainer } from '~/components/ui/CollectionItem';
import { m } from '~/paraglide/messages';

type Props = {
  children: ReactNode;
  id?: string;
};

export function BigCardGrid({ id, children }: Readonly<Props>) {
  return (
    <CollectionContainer id={id}>
      <Suspense
        fallback={['1', '2', '3', '4'].map((elem) => (
          <Grid key={elem} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Skeleton variant="rounded" width="100%" height="230px" />
          </Grid>
        ))}
      >
        <ErrorBoundary fallback={<ErrorLoadingCollections />}>
          {children}
        </ErrorBoundary>
      </Suspense>
    </CollectionContainer>
  );
}

function ErrorLoadingCollections() {
  return <Alert severity="error">{m.ERROR_LOADING_COLLECTIONS()}</Alert>;
}
