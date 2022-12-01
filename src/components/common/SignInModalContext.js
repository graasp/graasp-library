import PropTypes from 'prop-types';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { DATA_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../config/constants';
import { openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';

const CloseButton = styled(IconButton)(({ theme }) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const LoginModalContext = React.createContext();

const DialogTitle = (props) => {
  const { t } = useTranslation();
  // eslint-disable-next-line react/prop-types
  const { children, onClose } = props;
  return (
    <MuiDialogTitle disableTypography margin={0} p={1}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <CloseButton
          aria-label={t(LIBRARY.SIGN_IN_MODAL_CLOSE_BUTTON_ARIA_LABEL)}
          onClick={onClose}
        >
          <CloseIcon />
        </CloseButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogActions = styled(({ theme }) => ({
  '.MuiDialogActions-root': {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const LoginModalProvider = ({ children }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { hooks } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();
  const { queryClient } = useContext(QueryClientContext);

  useEffect(() => {
    // check whether user is signed in each time
    // the user switch to explore tab
    window.addEventListener('focus', () => {
      queryClient.invalidateQueries(DATA_KEYS.CURRENT_MEMBER_KEY);
    });
  }, []);

  useEffect(() => {
    // close modal if user is signed in
    if (user) {
      setOpen(false);
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    openInNewTab(SIGN_IN_ROUTE);
    setOpen(false);
  };

  const handleSignUp = () => {
    openInNewTab(SIGN_UP_ROUTE);
    setOpen(false);
  };

  const labelId = 'sign-in-modal';

  const renderModal = () => (
    <div>
      <Dialog onClose={handleClose} aria-labelledby={labelId} open={open}>
        <DialogTitle id={labelId} onClose={handleClose}>
          {t(LIBRARY.SIGN_IN_MODAL_TITLE)}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{t(LIBRARY.SIGN_IN_MODAL_CONTENT)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp} color="primary">
            {t(LIBRARY.SIGN_IN_MODAL_SIGN_UP_BUTTON)}
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={handleLogin}
            color="primary"
          >
            {t(LIBRARY.SIGN_IN_MODAL_SIGN_IN_BUTTON)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <LoginModalContext.Provider value={{ setOpen, open }}>
      {renderModal()}
      {children}
    </LoginModalContext.Provider>
  );
};

LoginModalProvider.propTypes = {
  children: PropTypes.node,
};

LoginModalProvider.defaultProps = {
  children: null,
};

export { LoginModalProvider, LoginModalContext };
