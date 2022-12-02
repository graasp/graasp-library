import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';

import { styled } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_SIZE,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

const StyledCardMedia = styled(CardMedia)(({ sx, link }) => ({
  minHeight: '60%',
  '&:hover': {
    cursor: link ? 'pointer' : 'mouse',
  },
  ...sx,
}));

const CardMediaComponent = ({ sx, name, link, itemId, size }) => {
  const router = useRouter();
  const { hooks } = useContext(QueryClientContext);

  return (
    <StyledCardMedia
      sx={sx}
      link={link}
      title={name}
      onClick={() => {
        router.push(link);
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <Thumbnail
          defaultValue={<img src={DEFAULT_ITEM_IMAGE_PATH} alt="thumbnail" />}
          alt={name}
          useThumbnail={hooks.useItemThumbnail}
          id={itemId}
          thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
          sx={{ width: '100%', objectFit: 'cover' }}
          size={size}
        />
      </div>
    </StyledCardMedia>
  );
};

CardMediaComponent.propTypes = {
  itemId: PropTypes.string.isRequired,
  sx: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  itemExtra: PropTypes.shape({}),
  size: PropTypes.string,
};

CardMediaComponent.defaultProps = {
  sx: {},
  link: null,
  itemExtra: null,
  size: DEFAULT_THUMBNAIL_SIZE,
};

export default CardMediaComponent;
