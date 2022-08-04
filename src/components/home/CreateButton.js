import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { redirect } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { GRAASP_BUILDER_URL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const CreateButton = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();

  const redirectToCompose = () => {
    redirect(GRAASP_BUILDER_URL);
  };

  // show create button only if logged in
  if (!user || !user.get('id')) {
    return null;
  }

  return (
    <Tooltip title={t(LIBRARY.CREATE_BUTTON_TOOLTIP)}>
      <Fab
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
