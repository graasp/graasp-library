import { useContext } from 'react';

import { MY_FAVORITES_COLLECTIONS_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import TabPanel from '../common/TabPanel';

type Props = {
  tab: number;
  index: number;
};

const MyFavorites = ({ tab, index }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: favorites, isLoading } = hooks.useFavoriteItems();
  const collections = favorites?.map((favorite) => favorite.item);

  return (
    <TabPanel value={tab} index={index}>
      <CollectionsGrid
        id={MY_FAVORITES_COLLECTIONS_ID}
        collections={collections as any}
        isLoading={isLoading}
      />
    </TabPanel>
  );
};

export default MyFavorites;
