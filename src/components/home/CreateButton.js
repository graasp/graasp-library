import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { redirect } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { GRAASP_BUILDER_URL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const CreateButton = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();
  const classes = useStyles();

  const redirectToCompose = () => {
    redirect(GRAASP_BUILDER_URL);
  };

  // show create button only if logged in
  if (!user || !user.id) {
    return null;
  }

  return (
    <Tooltip title={t(LIBRARY.CREATE_BUTTON_TOOLTIP)} placement="right">
      <Fab
        className={classes.button}
        size="small"
        color="primary"
        aria-label={t(LIBRARY.CREATE_BUTTON_TOOLTIP)}
        onClick={redirectToCompose}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default CreateButton;
