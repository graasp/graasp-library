import React from 'react';
import { useTranslation } from 'react-i18next';

import { Info } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { LIBRARY } from '@graasp/translations';

function ItemsHeader() {
  const { t } = useTranslation();
  return (
    <Box mb={2} flexGrow={1}>
      <Grid container spacing={0} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" color="inherit" display="flex">
            {t(LIBRARY.COLLECTION_ITEMS_TITLE)}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={t(LIBRARY.COLLECTION_ITEMS_TOOLTIP_MESSAGE)}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ItemsHeader;
