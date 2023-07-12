import PropTypes from 'prop-types';

import { useContext } from 'react';

import { MY_PUBLISHMENTS_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from '../common/TabPanel';

const MyPublishments = ({ tab, index }) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag();
  const ownCollections = collections?.filter(
    (collection) => collection?.creator === member?.id,
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_PUBLISHMENTS_COLLECTIONS_ID}
        collections={ownCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

MyPublishments.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default MyPublishments;
