import { List } from 'immutable';

import { useContext } from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import { MY_LIKES_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from '../common/TabPanel';

type Props = {
  tab: number;
  index: number;
};

const MyLikes = ({ tab, index }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: itemLikes, isLoading } = hooks.useLikesForMember(member?.id);
  const collections = itemLikes?.map((itemLike) => itemLike.item);

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_LIKES_COLLECTIONS_ID}
        // todo: this is an issue because the ItemLike type uses Item instead of DiscriminatedItem
        collections={collections as List<ItemRecord>}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

export default MyLikes;
