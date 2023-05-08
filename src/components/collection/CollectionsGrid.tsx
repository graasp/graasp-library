import { List } from 'immutable';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { buildCollectionCardGridId } from '../../config/selectors';
import CollectionCard from './CollectionCard';

type Props = {
  collections: List<ItemRecord>;
  isLoading: boolean;
  id: string;
};

const CollectionsGrid = ({ collections, isLoading, id }: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <Skeleton />;
  }

  return !collections?.size ? (
    <Typography variant="h5" color="inherit">
      {t(LIBRARY.EMPTY_COLLECTION_MESSAGE)}
    </Typography>
  ) : (
    <Container maxWidth="xl">
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
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={2}
            id={buildCollectionCardGridId(collection.id)}
          >
            <CollectionCard collection={collection} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollectionsGrid;
