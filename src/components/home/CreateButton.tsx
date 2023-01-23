import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';

import { redirect } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { GRAASP_BUILDER_HOST } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const CreateButton: FC = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();

  const redirectToCompose = () => {
    redirect(GRAASP_BUILDER_HOST);
  };

  // show create button only if logged in
  if (!user || !user.id) {
    return null;
  }

  return (
    <Tooltip title={t(LIBRARY.CREATE_BUTTON_TOOLTIP)} placement="right">
      <Fab
        sx={{ ml: 2 }}
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
