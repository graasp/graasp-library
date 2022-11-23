import PropTypes from 'prop-types';

import React from 'react';

import { Favorite } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Badge from '@mui/material/Badge';

import BadgeContainer from '../common/BadgeContainer';
import VisibilityBadge from '../common/VisibilityBadge';

function SimilarCollectionBadges({ views, voteScore }) {
  const voteScoreBadge = voteScore ? (
    <Badge badgeContent={voteScore} color="secondary" max={999}>
      <Favorite color="primary" />
    </Badge>
  ) : null;

  const viewBadge = views ? <VisibilityBadge views={views} /> : null;

  return (
    <Grid container mb={1}>
      <Grid item xs={12} justify="flex-start" alignItems="center">
        <BadgeContainer>
          {voteScoreBadge}
          {viewBadge}
        </BadgeContainer>
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
