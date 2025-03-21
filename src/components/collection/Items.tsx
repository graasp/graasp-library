import React, { useContext, useState } from 'react';

import { Add, Remove } from '@mui/icons-material';
import {
  Button,
  Grid2 as Grid,
  Grow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { useLibraryTranslation } from '../../config/i18n';
import { CHILDREN_ITEMS_GRID_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import { FileChildrenCard, FolderChildrenCard } from './ChildrenCard';

const DEFAULT_ITEM_SHOWN_COUNT = {
  xs: 4,
  sm: 4,
  md: 6,
  lg: 6,
  xl: 8,
};

type CollapsibleItemCategoryProps = {
  items: DiscriminatedItem[];
  defaultItemCount: number;
  children: (item: DiscriminatedItem) => JSX.Element;
};

const CollapsibleItemCategory: React.FC<CollapsibleItemCategoryProps> = ({
  items,
  children,
  defaultItemCount,
}) => {
  const { t } = useLibraryTranslation();

  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);

  const shownItems = React.useMemo(() => {
    if (showMoreItems) {
      return items;
    }
    return items.slice(0, defaultItemCount);
  }, [items, showMoreItems, defaultItemCount]);

  const handleShowMoreItems = () => {
    setShowMoreItems((prevValue) => !prevValue);
  };

  const additionalItemsCount = items.length - defaultItemCount;

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        {items.length > defaultItemCount && (
          <Button
            onClick={handleShowMoreItems}
            startIcon={showMoreItems ? <Remove /> : <Add />}
          >
            {showMoreItems
              ? t(LIBRARY.SUMMARY_ITEMS_SHOW_LESS, {
                  count: additionalItemsCount,
                })
              : t(LIBRARY.SUMMARY_ITEMS_SHOW_MORE, {
                  count: additionalItemsCount,
                })}
          </Button>
        )}
      </Box>
      <Grid container spacing={2} id={CHILDREN_ITEMS_GRID_ID} marginBottom={3}>
        {shownItems.map((item) => (
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
  parentId: string;
  lang: string;
  isTopLevel: boolean;
};

const Items: React.FC<ItemsProps> = ({ parentId, lang, isTopLevel }) => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: items, isLoading: isLoadingChildren } =
    hooks.useChildren(parentId);

  const theme = useTheme();

  const extraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const small = useMediaQuery(theme.breakpoints.down('md'));
  const medium = useMediaQuery(theme.breakpoints.down('lg'));
  const large = useMediaQuery(theme.breakpoints.down('xl'));

  const itemToShow = React.useMemo(() => {
    if (extraSmall) {
      return DEFAULT_ITEM_SHOWN_COUNT.xs;
    }
    if (small) {
      return DEFAULT_ITEM_SHOWN_COUNT.sm;
    }
    if (medium) {
      return DEFAULT_ITEM_SHOWN_COUNT.md;
    }
    if (large) {
      return DEFAULT_ITEM_SHOWN_COUNT.lg;
    }
    return DEFAULT_ITEM_SHOWN_COUNT.xl;
  }, [extraSmall, small, medium, large]);

  const emptyMessage = isTopLevel
    ? t(LIBRARY.COLLECTION_ITEMS_EMPTY_MESSAGE)
    : t(LIBRARY.COLLECTION_ITEMS_EMPTY_FOLDER_MESSAGE);

  const loadingMessage = t('Loading');

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight="bold">
        {t(LIBRARY.SUMMARY_CONTENT_TITLE)}
      </Typography>

      {!items?.length ? (
        <div className="Main">
          <Typography variant="body1" mx={1} color="inherit">
            {isLoadingChildren ? loadingMessage : emptyMessage}
          </Typography>
        </div>
      ) : (
        items.length > 0 && (
          <CollapsibleItemCategory defaultItemCount={itemToShow} items={items}>
            {(item) =>
              item.type === ItemType.FOLDER ? (
                <FolderChildrenCard key={item.id} item={item} />
              ) : (
                <FileChildrenCard key={item.id} item={item} lang={lang} />
              )
            }
          </CollapsibleItemCategory>
        )
      )}
    </div>
  );
};

export default Items;
