import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Info } from '@material-ui/icons';

import { LIBRARY } from '@graasp/translations';

const useStyles = makeStyles((theme) => ({
  cell: {
    display: 'flex',
  },
  root: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
}));

function SimilarCollectionsHeader() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="space-between">
        <Grid item>
          <Typography
            variant="h3"
            color="inherit"
            alignItems="center"
            className={classes.cell}
          >
            {t(LIBRARY.SIMILAR_COLLECTIONS_TITLE)}
          </Typography>
        </Grid>
        <Grid item alignItems="center" className={classes.cell}>
          <Tooltip title={t(LIBRARY.CONTRIBUTORS_TOOLTIP)}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

export default SimilarCollectionsHeader;
