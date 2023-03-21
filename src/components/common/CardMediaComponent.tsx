import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useContext } from 'react';

import { SxProps } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { UUID } from '@graasp/sdk';
import { ThumbnailSizeVariant } from '@graasp/sdk/frontend';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_SIZE,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

type Props = {
  sx?: SxProps;
  name: string;
  link?: string;
  itemId: UUID;
  size?: ThumbnailSizeVariant;
};

const CardMediaComponent = ({
  sx,
  name,
  link,
  itemId,
  size = DEFAULT_THUMBNAIL_SIZE,
}: Props): JSX.Element => {
  const router = useRouter();
  const { hooks } = useContext(QueryClientContext);
  const { data: thumbnailUrl, isLoading: isThumbnailLoading } =
    hooks.useItemThumbnailUrl({ id: itemId });

  return (
    <CardMedia
      title={name}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
      sx={{
        minHeight: '60%',
        '&:hover': {
          cursor: link ? 'pointer' : 'mouse',
        },
        ...((sx ?? {}) as any), // TODO: fix type
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
          alt={name}
          isLoading={isThumbnailLoading}
          url={thumbnailUrl ?? DEFAULT_ITEM_IMAGE_PATH}
          id={itemId}
          sx={{ width: '100%', objectFit: 'cover' }}
          size={size}
        />
      </div>
    </CardMedia>
  );
};

export default CardMediaComponent;
