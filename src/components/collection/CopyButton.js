import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { MUTATION_KEYS } from '@graasp/query-client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import TreeModal from './TreeModal';
import { LoginModalContext } from '../common/LoginModalContext';
import { QueryClientContext } from '../QueryClientContext';
import { ROOT_ID } from '../../config/constants';

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
    if (showLoginModal && !user?.isEmpty()) {
      openLoginModal(false);
      setShowTreeModal(true);
    }
    // if user signs out while copying
    // show login modal instead
    else if (showTreeModal && user?.isEmpty()) {
      openLoginModal(true);
      setShowTreeModal(false);
    }
  }, [user]);

  if (isLoading) {
    return null;
  }

  const onClick = () => {
    // display sign in modal if the user is not signed in
    if (!user?.isEmpty()) {
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
      <Tooltip title={t('Copy')}>
        <IconButton onClick={onClick} aria-label={t('Copy current item')}>
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderButton()}
      {!user?.isEmpty() && (
        <TreeModal
          description={t('Select one space from the list below')}
          title={t('Copy Item')}
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
