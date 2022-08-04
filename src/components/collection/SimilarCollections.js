import PropTypes from 'prop-types';

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CollectionsGrid from './CollectionsGrid';
import SimilarCollectionsHeader from './SimilarCollectionsHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function SimilarCollections({ similarCollections }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimilarCollectionsHeader />
      <CollectionsGrid collections={similarCollections} />
    </div>
  );
}

SimilarCollections.propTypes = {
  similarCollections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      creator: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      likes: PropTypes.number,
      views: PropTypes.number,
      rating: PropTypes.shape({
        value: PropTypes.number,
        count: PropTypes.number,
      }),
    }),
  ),
};

SimilarCollections.defaultProps = {
  similarCollections: [],
};

export default SimilarCollections;
