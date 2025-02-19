import React from 'react';

import { Grid2 as Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useLibraryTranslation } from '../../config/i18n';
import { buildCollectionCardGridId } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { ItemOrSearchedItem } from '../../utils/types';
import CollectionCard from './collectionCard/CollectionCard';

const HEIGHT = 230;

type Props = {
  collections?: ItemOrSearchedItem[];
  isLoading: boolean;
  id?: string;
  showIsContentTag?: boolean;
};

const CollectionsGrid = ({
  collections,
  isLoading,
  id,
  showIsContentTag,
}: Props) => {
  const { t } = useLibraryTranslation();
  const size = { xs: 12, sm: 12, md: 6, lg: 6, xl: 4 };

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
          <Grid key={idx} size={size}>
            <Skeleton height={HEIGHT} sx={{ transform: 'unset' }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return !collections?.length ? (
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
          size={size}
          id={buildCollectionCardGridId(collection.id)}
        >
          <CollectionCard
            height={HEIGHT}
            showIsContentTag={showIsContentTag}
            collection={collection}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionsGrid;
