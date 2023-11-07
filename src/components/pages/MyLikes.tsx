import { useContext } from 'react';

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
      collections={collections}
      isLoading={isLoading}
    />
  );
};

export default MyLikes;
