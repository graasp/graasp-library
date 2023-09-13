import React from 'react';

import { Info } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';

const CommentsHeader = () => {
  const { t } = useLibraryTranslation();
  const theme = useTheme();
  return (
    <div style={{ marginBottom: theme.spacing(2), flexGrow: 1 }}>
      <Grid container spacing={0} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" color="inherit" display="flex">
            {t(LIBRARY.COMMENTS_TITLE)}
          </Typography>
        </Grid>
        <Grid item display="flex">
          <Tooltip title={t(LIBRARY.COMMENTS_TOOLTIP)}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentsHeader;
