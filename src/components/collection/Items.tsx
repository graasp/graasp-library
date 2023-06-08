import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Add, Remove } from '@mui/icons-material';
import { Button, Grow, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { ITEM_TYPES } from '../../config/constants';
import { CHILDREN_ITEMS_GRID_ID } from '../../config/selectors';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
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
  items: Immutable.List<ItemRecord>;
  defaultItemCount: number;
  children: (item: ItemRecord) => JSX.Element;
};

const CollapsibleItemCategory: React.FC<CollapsibleItemCategoryProps> = ({
  items,
  children,
  defaultItemCount,
}) => {
  const { t } = useTranslation();

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

  const additionalItemsCount = items.size - defaultItemCount;

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        {items.size > defaultItemCount && (
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
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
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
  lang: string | undefined;
  isTopLevel: boolean;
};

const Items: React.FC<ItemsProps> = ({ parentId, lang, isTopLevel }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(parentId, {
    placeholderData: PLACEHOLDER_COLLECTIONS,
  });

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

  return (
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight="bold">
        {t(LIBRARY.SUMMARY_CONTENT_TITLE)}
      </Typography>

      {!items?.size ? (
        <div className="Main">
          <Typography variant="body1" mx={1} color="inherit">
            {emptyMessage}
          </Typography>
        </div>
      ) : (
        items.size > 0 && (
          <CollapsibleItemCategory defaultItemCount={itemToShow} items={items}>
            {(item) =>
              item.type === ITEM_TYPES.FOLDER ? (
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
