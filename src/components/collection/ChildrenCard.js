import PropTypes from 'prop-types';

import React from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { buildCollectionRoute } from '../../config/routes';
import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

export const ChildrenCard = ({ item }) => {
  const { name, id, extra } = item;

  const link = buildCollectionRoute(id);

  return (
    <StyledCard id={id}>
      <CardMedia
        itemId={id}
        name={name}
        link={link}
        // todo: improve card design
        sx={{ maxHeight: '60%', height: '150px' }}
      />

      <CardContent sx={{ maxHeight: '25%' }}>
        <Typography maxHeight="100%" noWrap variant="h6" component="h2">
          {name}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ height: '15%' }}>
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
      </CardActions>
    </StyledCard>
  );
};

ChildrenCard.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.shape({}),
  }).isRequired,
};

export default ChildrenCard;
