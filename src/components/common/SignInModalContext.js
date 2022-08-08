import PropTypes from 'prop-types';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { DATA_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../config/constants';
import { openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const LoginModalContext = React.createContext();

const DialogTitle = withStyles(styles)((props) => {
  const { t } = useTranslation();
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label={t(LIBRARY.SIGN_IN_MODAL_CLOSE_BUTTON_ARIA_LABEL)}
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
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
