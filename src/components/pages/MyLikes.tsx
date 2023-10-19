import { List } from 'immutable';

import { useContext } from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import { MY_LIKES_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';

const MyLikes = () => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: itemLikes, isLoading } = hooks.useLikesForMember(member?.id);
  const collections = itemLikes?.map((itemLike) => itemLike.item);

  return (
    <CollectionsGrid
      id={MY_LIKES_COLLECTIONS_ID}
      // todo: this is an issue because the ItemLike type uses Item instead of DiscriminatedItem
      collections={collections as List<ItemRecord>}
      isLoading={isLoading}
    />
  );
};

export default MyLikes;
