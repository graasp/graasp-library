import { List } from 'immutable';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LIBRARY } from '@graasp/translations';

import { buildCollectionCardGridId } from '../../config/selectors';
import CollectionCard from './CollectionCard';

function CollectionsGrid({ collections, isLoading, id, sm, md, lg, xl }) {
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
}

CollectionsGrid.propTypes = {
  id: PropTypes.string,
  collections: PropTypes.instanceOf(List),
  isLoading: PropTypes.bool.isRequired,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
};

CollectionsGrid.defaultProps = {
  id: '',
  collections: [],
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3,
};

export default CollectionsGrid;
