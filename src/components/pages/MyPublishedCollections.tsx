import { useContext } from 'react';

import { MY_PUBLISHED_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from '../common/TabPanel';

type Props = {
  tab: number;
  index: number;
};

const MyPublishedCollections = ({ tab, index }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.usePublishedItemsForMember(
    member?.id,
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_PUBLISHED_COLLECTIONS_ID}
        collections={collections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

export default MyPublishedCollections;
