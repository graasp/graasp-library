import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useLibraryTranslation } from '../../config/i18n';
import {
  COPY_MODAL_TITLE_ID,
  TREE_MODAL_CONFIRM_BUTTON_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import TreeModalContent from './TreeModalContent';

type TreeModalProps = {
  onConfirm: (args: { to: string }) => void;
  onClose: (args: { id: string | null; open: boolean }) => void;
  title: string;
  open?: boolean;
};

/*
  TODO: factor out the behavior of the component? It is shared with
  https://github.com/graasp/graasp-builder/blob/8af8a794b687abdd3d0e3ec83a6d16eb72e1e5f6/src/components/main/TreeModal.js
 */
const TreeModal = ({
  open = false,
  title,
  onClose,
  onConfirm,
}: TreeModalProps) => {
  const { t } = useLibraryTranslation();

  const [selectedId, setSelectedId] = useState<string>();

  const handleClose = () => {
    onClose({ id: null, open: false });
  };

  const onClickConfirm = () => {
    if (selectedId) {
      onConfirm({ to: selectedId });
      handleClose();
    }
  };

  const onTreeItemSelect = (nodeId: string) => {
    if (selectedId === nodeId) {
      setSelectedId(undefined);
    } else {
      setSelectedId(nodeId);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={COPY_MODAL_TITLE_ID}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={COPY_MODAL_TITLE_ID}>{title}</DialogTitle>
      <DialogContent>
        <TreeModalContent
          open={open}
          selectedId={selectedId}
          onTreeItemSelect={onTreeItemSelect}
        />
      </DialogContent>
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

export default TreeModal;
