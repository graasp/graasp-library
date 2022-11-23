import React from 'react';
import { useTranslation } from 'react-i18next';

import { Info } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { LIBRARY } from '@graasp/translations';

function SimilarCollectionsHeader() {
  const { t } = useTranslation();
  return (
    <Box mb={2} flexGrow={1}>
      <Grid container spacing={0} justify="space-between">
        <Grid item>
          <Typography
            variant="h3"
            color="inherit"
            alignItems="center"
            display="flex"
          >
            {t(LIBRARY.SIMILAR_COLLECTIONS_TITLE)}
          </Typography>
        </Grid>
        <Grid item alignItems="center">
          <Tooltip title={t(LIBRARY.CONTRIBUTORS_TOOLTIP)}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SimilarCollectionsHeader;
