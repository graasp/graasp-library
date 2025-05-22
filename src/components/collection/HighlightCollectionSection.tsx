import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  Alert,
  Container,
  Grid,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import { m } from '~/paraglide/messages';

import { SECTION_TITLE_ID } from '../../config/selectors';
import StyledContainer from '../layout/StyledContainer';
import { CollectionContainer } from '../ui/CollectionItem';

type Props = {
  id: string;
  collectionGridId?: string;
  title: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
};

export function HighlightCollectionSection({
  id,
  collectionGridId,
  title,
  sx,
  children,
}: Readonly<Props>) {
  return (
    <StyledContainer sx={sx} id={id}>
      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={3} id={SECTION_TITLE_ID}>
          {title}
        </Typography>

        <CollectionContainer id={collectionGridId}>
          <Suspense
            fallback={
              // use 6 elements since the possible combinations are 1, 2 and 3 per row, so we always have full rows
              ['1', '2', '3', '4', '5', '6'].map((elem) => (
                <Grid key={elem} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                  <Skeleton variant="rounded" width="100%" height="230px" />
                </Grid>
              ))
            }
          >
            <ErrorBoundary fallback={<ErrorLoadingCollections />}>
              {children}
            </ErrorBoundary>
          </Suspense>
        </CollectionContainer>
      </Container>
    </StyledContainer>
  );
}

function ErrorLoadingCollections() {
  return <Alert severity="error">{m.ERROR_LOADING_COLLECTIONS()}</Alert>;
}
