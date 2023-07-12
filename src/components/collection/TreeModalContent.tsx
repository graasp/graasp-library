import dynamic from 'next/dynamic';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { CircularProgress, Typography } from '@mui/material';

import { ItemType } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { TREE_VIEW_MAX_WIDTH } from '../../config/constants';
import {
  TREE_MODAL_MY_ITEMS_ID,
  TREE_MODAL_SHARED_ITEMS_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';

const DynamicTreeView = dynamic(
  () => import('@graasp/ui').then((mod) => mod.DynamicTreeView),
  {
    ssr: false,
  },
);

type TreeModalContentProps = {
  open: boolean;
  selectedId?: string;
  onTreeItemSelect: (nodeId: string) => void;
};

const TreeModalContent = ({
  open,
  selectedId,
  onTreeItemSelect,
}: TreeModalContentProps) => {
  const { t } = useTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { useItem, useOwnItems, useChildren, useSharedItems } = hooks;
  const {
    data: ownItems,
    isLoading: isOwnItemsLoading,
    isSuccess: isOwnItemsSuccess,
  } = useOwnItems();
  // todo: get only shared items with write/admin rights
  // otherwise choosing an item without the write rights will result in an error
  const {
    data: sharedItems,
    isLoading: isSharedItemsLoading,
    isSuccess: isSharedItemsSuccess,
  } = useSharedItems();

  const isFolder = (i: ItemRecord) => i.type === ItemType.FOLDER;

  // compute tree only when the modal is open
  if (open) {
    if (isOwnItemsSuccess && isSharedItemsSuccess) {
      return (
        <>
          <DynamicTreeView
            id={TREE_MODAL_MY_ITEMS_ID}
            rootSx={{
              flexGrow: 1,
              maxWidth: TREE_VIEW_MAX_WIDTH,
            }}
            selectedId={selectedId}
            items={ownItems}
            onTreeItemSelect={onTreeItemSelect}
            useChildren={useChildren}
            useItem={useItem}
            showCheckbox
            rootLabel={t(LIBRARY.OWN_ITEMS_LABEL)}
            rootId={TREE_MODAL_MY_ITEMS_ID}
            showItemFilter={isFolder}
            shouldFetchChildrenForItem={isFolder}
          />
          <DynamicTreeView
            id={TREE_MODAL_SHARED_ITEMS_ID}
            rootSx={{
              flexGrow: 1,
              maxWidth: TREE_VIEW_MAX_WIDTH,
            }}
            selectedId={selectedId}
            items={sharedItems}
            onTreeItemSelect={onTreeItemSelect}
            useChildren={useChildren}
            useItem={useItem}
            showCheckbox
            rootLabel={t(LIBRARY.SHARED_ITEMS_LABEL)}
            rootId={TREE_MODAL_SHARED_ITEMS_ID}
            showItemFilter={isFolder}
            shouldFetchChildrenForItem={isFolder}
          />
        </>
      );
    }
    if (isOwnItemsLoading || isSharedItemsLoading) {
      return <CircularProgress />;
    }
    return <Typography>{t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}</Typography>;
  }
  return null;
};
export default TreeModalContent;
