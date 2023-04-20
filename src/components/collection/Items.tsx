import { List } from 'immutable';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Add, Remove } from '@mui/icons-material';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import { Button, Grow } from '@mui/material';

import { LIBRARY } from '@graasp/translations';
import { ItemRecord } from '@graasp/sdk/dist/frontend/types';

import { CHILDREN_ITEMS_GRID_ID } from '../../config/selectors';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import { FileChildrenCard, FolderChildrenCard } from './ChildrenCard';
import { ITEM_TYPES } from '../../config/constants';

type CollapsibleItemCategoryProps = {
  title: string;
  items: Immutable.List<ItemRecord>;
  children: (item: ItemRecord) => JSX.Element;
};

const DEFAULT_ITEM_SHOWN_COUNT = 8;

const CollapsibleItemCategory: React.FC<CollapsibleItemCategoryProps> = ({
  items,
  title,
  children,
}) => {
  const { t } = useTranslation();

  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);

  const shownItems = React.useMemo(() => {
    if (showMoreItems) {
      return items;
    }
    return items.slice(0, DEFAULT_ITEM_SHOWN_COUNT);
  }, [items, showMoreItems]);

  const handleShowMoreItems = () => {
    setShowMoreItems((prevValue) => !prevValue);
  };

  const additionalItemsCount = items.size - DEFAULT_ITEM_SHOWN_COUNT;

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h6' fontWeight='bold'>
          {title}
        </Typography>
        {items.size > DEFAULT_ITEM_SHOWN_COUNT && (
          <Button onClick={handleShowMoreItems} startIcon={showMoreItems ? <Remove /> : <Add />}>
            {showMoreItems ?
              t(LIBRARY.SUMMARY_ITEMS_SHOW_LESS, { count: additionalItemsCount }) :
              t(LIBRARY.SUMMARY_ITEMS_SHOW_MORE, { count: additionalItemsCount })}
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
};

const Items: React.FC<ItemsProps> = ({ parentId, lang }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(parentId, {
    placeholderData: List(PLACEHOLDER_COLLECTION.children),
  });

  return (
    <div style={{ flexGrow: 1 }}>
      {!items?.size ? (
        <div className="Main">
          <Typography variant="h5" color="inherit">
            {t(LIBRARY.COLLECTION_ITEMS_EMPTY_MESSAGE)}
          </Typography>
        </div>
      ) : (
        <>
          {items.size > 0 && (
            <CollapsibleItemCategory
              title={t(LIBRARY.SUMMARY_CONTENT_TITLE)}
              items={items}
            >
              {(item) => (
                item.type === ITEM_TYPES.FOLDER ?
                  <FolderChildrenCard key={item.id} item={item} /> :
                  <FileChildrenCard key={item.id} item={item} lang={lang} />
              )}
            </CollapsibleItemCategory>
          )}
        </>
      )}
    </div>
  );
};

export default Items;
