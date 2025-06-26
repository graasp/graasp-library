import { Suspense } from 'react';
import type { JSX } from 'react';

import { Grid, Grow, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ItemType } from '@graasp/sdk';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PackedItem } from '~/openapi/client';
import { getChildrenOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';
import { getLocale } from '~/paraglide/runtime';

import { CHILDREN_ITEMS_GRID_ID } from '../../config/selectors';
import { FileChildrenCard, FolderChildrenCard } from './ChildrenCard';

type CollapsibleItemCategoryProps = {
  items: PackedItem[];
  // defaultItemCount: number;
  children: (item: PackedItem) => JSX.Element;
};

const CollapsibleItemCategory = ({
  items,
  children,
}: CollapsibleItemCategoryProps) => {
  // const [showMoreItems, setShowMoreItems] = useState<boolean>(false);

  // const shownItems = React.useMemo(() => {
  //   if (showMoreItems) {
  //     return items;
  //   }
  //   return items.slice(0, defaultItemCount);
  // }, [items, showMoreItems, defaultItemCount]);

  // const handleShowMoreItems = () => {
  //   setShowMoreItems((prevValue) => !prevValue);
  // };

  // const additionalItemsCount = items.length - defaultItemCount;

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        {/* {items.length > defaultItemCount && (
          <Button
            onClick={handleShowMoreItems}
            startIcon={showMoreItems ? <Remove /> : <Add />}
          >
            {showMoreItems
              ? m.SUMMARY_ITEMS_SHOW_LESS({
                  count: additionalItemsCount,
                })
              : m.SUMMARY_ITEMS_SHOW_MORE({
                  count: additionalItemsCount,
                })}
          </Button>
        )} */}
      </Box>
      <Grid container spacing={2} id={CHILDREN_ITEMS_GRID_ID} marginBottom={3}>
        {items.map((item) => (
          <Grow in key={item.id}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
              {children(item)}
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
};

type ItemsProps = {
  collectionId: string;
  isTopLevel: boolean;
};

export function ChildrenItems({
  collectionId,
  isTopLevel,
}: Readonly<ItemsProps>) {
  return (
    <Box flexGrow={1}>
      <Typography variant="h6" fontWeight="bold">
        {m.SUMMARY_CONTENT_TITLE()}
      </Typography>

      <Suspense fallback={<LoadingItems />}>
        <SuspendedItems collectionId={collectionId} isTopLevel={isTopLevel} />
      </Suspense>
    </Box>
  );
}

function LoadingItems() {
  return <Skeleton variant="rounded" />;
}

function SuspendedItems({
  collectionId,
  isTopLevel,
}: Readonly<{
  collectionId: string;
  isTopLevel: boolean;
}>) {
  const { data: items } = useSuspenseQuery(
    getChildrenOptions({ path: { id: collectionId } }),
  );

  if (items.length === 0) {
    return (
      <Typography variant="body1" mx={1} color="inherit">
        {isTopLevel
          ? m.COLLECTION_ITEMS_EMPTY_MESSAGE()
          : m.COLLECTION_ITEMS_EMPTY_FOLDER_MESSAGE()}
      </Typography>
    );
  }

  return (
    <CollapsibleItemCategory items={items}>
      {(item) =>
        item.type === ItemType.FOLDER ? (
          <FolderChildrenCard key={item.id} item={item} />
        ) : (
          <FileChildrenCard key={item.id} item={item} lang={getLocale()} />
        )
      }
    </CollapsibleItemCategory>
  );
}
