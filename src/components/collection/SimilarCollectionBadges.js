import PropTypes from 'prop-types';

import React from 'react';

import { Grid } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, Visibility } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  badges: {
    '& > *': {
      marginRight: theme.spacing(3),
    },
  },
  root: {
    marginBottom: theme.spacing(),
  },
  cell: {
    display: 'flex',
  },
}));

function SimilarCollectionBadges({ views, voteScore }) {
  const classes = useStyles();

  const voteScoreBadge = voteScore ? (
    <Badge badgeContent={voteScore} color="secondary" max={999}>
      <Favorite color="primary" />
    </Badge>
  ) : null;

  const viewBadge = views ? (
    <Badge badgeContent={views} color="secondary" max={999}>
      <Visibility color="primary" />
    </Badge>
  ) : null;

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        className={classes.cell}
        justify="flex-start"
        alignItems="center"
      >
        <div className={classes.badges}>
          {voteScoreBadge}
          {viewBadge}
        </div>
      </Grid>
    </Grid>
  );
}

SimilarCollectionBadges.propTypes = {
  voteScore: PropTypes.number,
  views: PropTypes.number,
  rating: PropTypes.shape({
    count: PropTypes.number,
    value: PropTypes.number,
  }),
};

SimilarCollectionBadges.defaultProps = {
  views: 0,
  voteScore: 0,
  rating: {
    count: 0,
    value: 0,
  },
};

export default SimilarCollectionBadges;
