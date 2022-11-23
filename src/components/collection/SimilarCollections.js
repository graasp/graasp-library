import PropTypes from 'prop-types';

import React from 'react';

import { Box } from '@mui/material';

import CollectionsGrid from './CollectionsGrid';
import SimilarCollectionsHeader from './SimilarCollectionsHeader';

function SimilarCollections({ similarCollections }) {
  return (
    <Box flexGrow={1}>
      <SimilarCollectionsHeader />
      <CollectionsGrid collections={similarCollections} />
    </Box>
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
