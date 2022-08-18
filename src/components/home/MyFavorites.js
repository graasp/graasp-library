import PropTypes from 'prop-types';

import React, { useContext } from 'react';

import { PUBLISHED_TAG_ID } from '../../config/env';
import { MY_FAVORITES_COLLECTIONS_ID } from '../../config/selectors';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from './TabPanel';

function MyFavorites({ tab, index }) {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const favoriteItemsList = member?.extra?.favoriteItems || [];
  const favoriteCollections = collections?.filter((collection) =>
    favoriteItemsList?.includes(collection?.id),
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_FAVORITES_COLLECTIONS_ID}
        collections={favoriteCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
}

MyFavorites.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyFavorites;
