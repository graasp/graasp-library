import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { MY_LIKES_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from './TabPanel';

type Props = {
  tab: number;
  index: number;
};

const MyLikes = ({ tab, index }: Props): JSX.Element => {
  const Loader = dynamic(() => import('@graasp/ui').then((mod) => mod.Loader), {
    ssr: false,
  });

  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: collections, isLoading } = hooks.useAllPublishedItems();
  const { data: likes, isLoading: isLikesLoading } = hooks.useLikesForMember(
    member?.id,
  );
  const likedItemsList = likes?.map((entry) => entry.item.id);
  const likedCollections = collections?.filter((collection) =>
    likedItemsList?.includes(collection?.id),
  );

  if (isLikesLoading || isLoading) {
    return <Loader />;
  }

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_LIKES_COLLECTIONS_ID}
        collections={likedCollections}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

export default MyLikes;
