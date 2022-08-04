import PropTypes from 'prop-types';

import React, { useContext, useState } from 'react';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

import { LIBRARY } from '@graasp/translations';

import {
  ITEM_TYPES,
  ROOT_ID,
  TREE_VIEW_HEIGHT,
  TREE_VIEW_MIN_WIDTH,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const styles = () => ({
  root: {
    height: TREE_VIEW_HEIGHT,
    flexGrow: 1,
    minWidth: TREE_VIEW_MIN_WIDTH,
  },
  cancelButton: {
    color: '#f44336',
  },
});

const TreeModal = ({
  title,
  classes,
  open,
  t,
  onClose,
  onConfirm,
  description,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const { hooks } = useContext(QueryClientContext);
  const { data: ownItems, isLoading } = hooks.useOwnItems();

  const handleClose = () => {
    onClose();
  };

  const submit = () => {
    onConfirm({ id: selectedId });
    handleClose();
  };

  const onSelect = (e, value) => {
    setSelectedId(value);
  };

  const renderOwnItems = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      );
    }

    if (!ownItems || !ownItems.size) {
      return null;
    }

    return ownItems
      .filter((i) => i.type === ITEM_TYPES.FOLDER)
      .map(({ name, id }) => <TreeItem key={id} nodeId={id} label={name} />);
  };

  const renderDescription = () => {
    if (!description) {
      return null;
    }

    return <Typography variant="subtitle2">{description}</Typography>;
  };

  // compute tree only when the modal is open
  // todo: use graasp-ui tree modal
  const tree = !open ? null : (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={onSelect}
    >
      <TreeItem
        nodeId={ROOT_ID}
        label={t(LIBRARY.COPY_BUTTON_MODAL_MY_ITEMS_ROOT)}
      >
        {renderOwnItems()}
      </TreeItem>
    </TreeView>
  );

  const label = 'simple-dialog-title';
  return (
    <Dialog onClose={handleClose} aria-labelledby={label} open={open}>
      <DialogTitle id={label}>
        {title}
        {renderDescription()}
      </DialogTitle>
      <DialogContent>{tree}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.cancelButton}>
          {t(LIBRARY.TREE_MODAL_CANCEL_BUTTON)}
        </Button>
        <Button onClick={submit} color="primary" disabled={!selectedId}>
          {t(LIBRARY.TREE_MODAL_CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TreeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    cancelButton: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  t: PropTypes.func.isRequired,
  description: PropTypes.string,
};

TreeModal.defaultProps = {
  description: '',
  title: 'Tree Modal',
};

const TranslatedComponent = withTranslation()(TreeModal);
export default withStyles(styles, { withTheme: true })(TranslatedComponent);
