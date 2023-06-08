import dynamic from 'next/dynamic';
import PropTypes, { arrayOf } from 'prop-types';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { LIBRARY } from '@graasp/translations';

import { ITEM_TYPES, TREE_VIEW_MAX_WIDTH } from '../../config/constants';
import {
  COPY_MODAL_TITLE_ID,
  TREE_MODAL_CONFIRM_BUTTON_ID,
  TREE_MODAL_MY_ITEMS_ID,
  TREE_MODAL_SHARED_ITEMS_ID,
  buildTreeItemId,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';

const Loader = dynamic(() => import('@graasp/ui').then((mod) => mod.Loader), {
  ssr: false,
});
const DynamicTreeView = dynamic(
  () => import('@graasp/ui').then((mod) => mod.DynamicTreeView),
  {
    ssr: false,
  },
);

/*
  TODO: factor out the behaviour of the component? It is shared with
  https://github.com/graasp/graasp-builder/blob/8af8a794b687abdd3d0e3ec83a6d16eb72e1e5f6/src/components/main/TreeModal.js
 */
const TreeModal = ({ itemIds, open, title, onClose, onConfirm }) => {
  const { hooks } = useContext(QueryClientContext);
  const { useItem, useItems, useOwnItems, useChildren, useSharedItems } = hooks;

  const { t } = useTranslation();
  const { data: ownItems, isLoading: isOwnItemsLoading } = useOwnItems();
  // todo: get only shared items with write/admin rights
  // otherwise choosing an item without the write rights will result in an error
  const { data: sharedItems, isLoading: isSharedItemsLoading } =
    useSharedItems();
  const [selectedId, setSelectedId] = useState(null);
  const { isItemLoading } = useItems(itemIds);

  if (open && (isOwnItemsLoading || isSharedItemsLoading || isItemLoading)) {
    return <Loader id="treeModalLoader" />;
  }

  const handleClose = () => {
    onClose({ id: null, open: false });
  };

  const onClickConfirm = () => {
    onConfirm({ to: selectedId });
    handleClose();
  };

  const onTreeItemSelect = (nodeId) => {
    if (selectedId === nodeId) {
      setSelectedId(null);
    } else {
      setSelectedId(nodeId);
    }
  };

  const isFolder = (i) => i.type === ITEM_TYPES.FOLDER;

  // compute tree only when the modal is open
  const tree = !open ? null : (
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
        rootClassName={buildTreeItemId(TREE_MODAL_MY_ITEMS_ID)}
        showItemFilter={isFolder}
        shouldFetchChildrenForItem={isFolder}
        buildTreeItemId={buildTreeItemId}
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
        rootClassName={buildTreeItemId(TREE_MODAL_SHARED_ITEMS_ID)}
        showItemFilter={isFolder}
        shouldFetchChildrenForItem={isFolder}
        buildTreeItemId={buildTreeItemId}
      />
    </>
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={COPY_MODAL_TITLE_ID}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={COPY_MODAL_TITLE_ID}>{title}</DialogTitle>
      <DialogContent>{tree}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          {t(LIBRARY.TREE_MODAL_CANCEL_BUTTON)}
        </Button>
        <Button
          onClick={onClickConfirm}
          disabled={!selectedId}
          id={TREE_MODAL_CONFIRM_BUTTON_ID}
        >
          {t(LIBRARY.TREE_MODAL_CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TreeModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itemIds: arrayOf(PropTypes.string),
  open: PropTypes.bool,
};

TreeModal.defaultProps = {
  itemIds: null,
  open: false,
};

export default TreeModal;
