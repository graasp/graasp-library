import React from 'react';

import { Breakpoint, Grid2 as Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { BigCard } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import { buildCollectionCardGridId } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { ItemOrSearchedItem } from '../../utils/types';
import CollectionCard from './CollectionCard';

type Props = {
  collections?: ItemOrSearchedItem[];
  isLoading: boolean;
  id?: string;
  containerWidth?: Breakpoint | false;
  showIsContentTag?: boolean;
};

const height = 300;

const CollectionsGrid = ({
  collections,
  isLoading,
  id,
  containerWidth,
  showIsContentTag,
}: Props) => {
  const { t } = useLibraryTranslation();

  if (isLoading) {
    return (
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="flex-start"
        id={id}
      >
        {Array.from({ length: 4 }, (_, idx) => idx).map((idx) => (
          <Grid key={idx} size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }}>
            <Skeleton height={height} sx={{ transform: 'unset' }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Container maxWidth={containerWidth ?? 'xl'}>
      {!collections?.length ? (
        <Typography variant="h5" color="inherit">
          {t(LIBRARY.EMPTY_COLLECTION_MESSAGE)}
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          alignItems="stretch"
          justifyContent="flex-start"
          id={id}
        >
          {collections?.map((collection) => (
            <Grid
              key={collection.id}
              size={{
                xs: 6,
                sm: 4,
                md: 3,
                lg: 3,
                xl: 2,
              }}
              id={buildCollectionCardGridId(collection.id)}
            >
              <BigCard
                name={collection.name}
                id={collection.id}
                type={collection.type}
                tags={collection.settings.tags}
                creator={collection.creator}
                description={collection.description ?? undefined}
                // image={}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CollectionsGrid;
