import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';

import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_SIZE,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

const CardMediaComponent = ({
  className,
  name,
  link,
  itemId,
  itemExtra,
  size,
}) => {
  const router = useRouter();
  const useStyles = makeStyles(() => ({
    media: {
      minHeight: '60%',
      // necessary to trigger content height 100%
      height: 0,
      '&:hover': {
        cursor: link ? 'pointer' : 'mouse',
      },
    },
    image: {
      width: '100%',
      objectFit: 'cover',
    },
  }));
  const { hooks } = useContext(QueryClientContext);

  const classes = useStyles();

  return (
    <CardMedia
      className={clsx(classes.media, className)}
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
        }}
      >
        <Thumbnail
          defaultImage={DEFAULT_ITEM_IMAGE_PATH}
          alt={name}
          useThumbnail={hooks.useItemThumbnail}
          id={itemId}
          extra={itemExtra}
          className={classes.image}
          size={size}
        />
      </div>
    </CardMedia>
  );
};

CardMediaComponent.propTypes = {
  itemId: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  itemExtra: PropTypes.shape({}),
  size: PropTypes.string,
};

CardMediaComponent.defaultProps = {
  className: '',
  link: null,
  itemExtra: null,
  size: DEFAULT_THUMBNAIL_SIZE,
};

export default CardMediaComponent;
