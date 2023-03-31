import PropTypes from 'prop-types';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import { ROOT_ID } from '../../config/constants';
import {
  TREE_MODAL_MY_ITEMS_ID,
  TREE_MODAL_SHARED_ITEMS_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import TreeModal from './TreeModal';

export const useCopyAction = (itemId) => {
  const { t } = useTranslation();

  const [showTreeModal, setShowTreeModal] = useState(false);
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();
  const { mutate: copyItem, isLoading: isCopying } = useMutation(
    MUTATION_KEYS.COPY_PUBLIC_ITEM,
  );

  const startCopy = (event) => {
    if (user?.id) {
      setShowTreeModal(true);
    }
    event.stopPropagation();
  };

  // todo: set notifier for copy
  const copy = ({ to }) => {
    // remove loading icon on callback
    // do not set parent if it is root
    copyItem({
      itemId,
      to: [
        ROOT_ID,
        TREE_MODAL_MY_ITEMS_ID,
        TREE_MODAL_SHARED_ITEMS_ID,
      ].includes(to)
        ? undefined
        : to,
    });
  };

  const treeModal = user?.id && (
    <TreeModal
      title={t(LIBRARY.COPY_BUTTON_MODAL_TITLE)}
      open={showTreeModal}
      onClose={() => setShowTreeModal(false)}
      onConfirm={copy}
      itemIds={[itemId]}
    />
  );

  return {
    treeModal,
    startCopy,
    isCopying,
  };
};

const CopyButton = ({ id }) => {
  const { t } = useTranslation();

  const { treeModal, isCopying, startCopy } = useCopyAction(id);

  const renderButton = () => {
    if (isCopying) {
      return <CircularProgress color="primary" size={10} />;
    }

    return (
      <Tooltip title={t(LIBRARY.COPY_BUTTON_TOOLTIP)} placement="top">
        <IconButton
          onClick={startCopy}
          aria-label={t(LIBRARY.COPY_BUTTON_TOOLTIP)}
        >
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderButton()}
      {treeModal}
    </>
  );
};

CopyButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CopyButton;
