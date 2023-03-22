import { List } from 'immutable';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { buildCollectionCardGridId } from '../../config/selectors';
import CollectionCard from './CollectionCard';

type Props = {
  id?: string;
  collections?: List<ItemRecord>;
  isLoading: boolean;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const CollectionsGrid = ({
  isLoading,
  id = '',
  collections = List(),
  sm = 6,
  md = 4,
  lg = 3,
  xl = 3,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return !collections?.size ? (
    <Typography variant="h5" color="inherit">
      {t(LIBRARY.EMPTY_COLLECTION_MESSAGE)}
    </Typography>
  ) : (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="flex-start"
      id={id}
    >
      {collections?.map((collection, index) => (
        <Grid
          key={collection?.id}
          item
          xs={12}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          id={buildCollectionCardGridId(id, index)}
        >
          <CollectionCard collection={collection} isLoading={isLoading} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionsGrid;
