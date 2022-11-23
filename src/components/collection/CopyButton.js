import PropTypes from 'prop-types';

import React, { useContext, useEffect, useState } from 'react';
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
import { LoginModalContext } from '../common/SignInModalContext';
import TreeModal from './TreeModal';

const CopyButton = ({ id }) => {
  const { t } = useTranslation();
  const [showTreeModal, setShowTreeModal] = useState(false);
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: user, isLoading } = hooks.useCurrentMember();
  const { mutate: copyItem, isLoading: isCopying } = useMutation(
    MUTATION_KEYS.COPY_PUBLIC_ITEM,
  );

  const { setOpen: setShowLoginModal, open: showLoginModal } =
    useContext(LoginModalContext);

  useEffect(() => {
    // if the user signs in while the login modal is open
    // switch to copy modal
    if (showLoginModal && !user?.id) {
      setShowLoginModal(false);
      setShowTreeModal(true);
    }
    // if user signs out while copying
    // show login modal instead
    else if (showTreeModal && !user?.id) {
      setShowLoginModal(true);
      setShowTreeModal(false);
    }
  }, [user]);

  if (isLoading) {
    return null;
  }

  const onClick = () => {
    // show item tree, otherwise display sign in modal if the user is not signed in
    if (user?.id) {
      setShowTreeModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  // todo: set notifier for copy
  const copy = ({ to }) => {
    // remove loading icon on callback
    // do not set parent if it is root
    copyItem({
      id,
      to: [
        ROOT_ID,
        TREE_MODAL_MY_ITEMS_ID,
        TREE_MODAL_SHARED_ITEMS_ID,
      ].includes(to)
        ? undefined
        : to,
    });
  };

  const renderButton = () => {
    if (isCopying) {
      return <CircularProgress color="primary" size={20} />;
    }

    return (
      <Tooltip title={t(LIBRARY.COPY_BUTTON_TOOLTIP)}>
        <IconButton
          onClick={onClick}
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
      {user?.id && (
        <TreeModal
          title={t(LIBRARY.COPY_BUTTON_MODAL_TITLE)}
          open={showTreeModal}
          onClose={() => setShowTreeModal(false)}
          onConfirm={copy}
          itemIds={[id]}
        />
      )}
    </>
  );
};

CopyButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CopyButton;
