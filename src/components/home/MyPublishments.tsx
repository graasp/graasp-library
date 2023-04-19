import React, { useContext } from 'react';

import { MY_PUBLISHMENTS_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from './TabPanel';

type Props = {
  tab: number;
  index: number;
};

const MyPublishments = ({ tab, index }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: myCollections, isLoading } = hooks.usePublishedItemsForMember(
    member?.id,
  );

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_PUBLISHMENTS_COLLECTIONS_ID}
        collections={myCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

export default MyPublishments;
