import PropTypes from 'prop-types';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import { ROOT_ID } from '../../config/constants';
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

  const { setOpen: openLoginModal, open: showLoginModal } =
    useContext(LoginModalContext);

  useEffect(() => {
    // if the user signs in while the login modal is open
    // switch to copy modal
    if (showLoginModal && !user?.id) {
      openLoginModal(false);
      setShowTreeModal(true);
    }
    // if user signs out while copying
    // show login modal instead
    else if (showTreeModal && !user?.id) {
      openLoginModal(true);
      setShowTreeModal(false);
    }
  }, [user]);

  if (isLoading) {
    return null;
  }

  const onClick = () => {
    // display sign in modal if the user is not signed in
    if (!user?.id) {
      setShowTreeModal(true);
    } else {
      openLoginModal(true);
    }
  };

  // todo: set notifier for copy
  const copy = ({ id: toSpace }) => {
    // remove loading icon on callback
    // do not set parent if it is root
    copyItem({ id, to: toSpace === ROOT_ID ? undefined : toSpace });
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
          description={t(LIBRARY.COPY_BUTTON_MODAL_DESCRIPTION)}
          title={t(LIBRARY.COPY_BUTTON_MODAL_TITLE)}
          open={showTreeModal}
          onConfirm={copy}
          itemId={id}
          onClose={() => setShowTreeModal(false)}
        />
      )}
    </>
  );
};

CopyButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CopyButton;
