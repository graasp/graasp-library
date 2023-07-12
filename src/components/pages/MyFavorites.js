import PropTypes from 'prop-types';

import { useContext } from 'react';

import { MY_FAVORITES_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from '../common/TabPanel';

const MyFavorites = ({ tab, index }) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag();
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
};

MyFavorites.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyFavorites;
