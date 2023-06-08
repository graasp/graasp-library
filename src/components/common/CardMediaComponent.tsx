import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { Box } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ThumbnailSizeVariant } from '@graasp/sdk/frontend';

import { DEFAULT_ITEM_IMAGE_PATH } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

type Props = {
  name?: string;
  itemId?: string;
  size?: ThumbnailSizeVariant;
  svgPadding?: number;
};

const CardMediaComponent = ({
  name,
  itemId,
  size = ThumbnailSize.Small,
  svgPadding = 15,
}: Props) => {
  const { hooks } = useContext(QueryClientContext);

  return (
    <Box
      title={name}
      overflow="hidden"
      lineHeight={0}
      sx={{
        aspectRatio: '1 / 1',
        '& img[src$=".svg"]': {
          maxHeight: `100%`,
          maxWidth: `100%`,
          padding: `${svgPadding}%`,
        },
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Thumbnail
        alt={name || ''}
        useThumbnail={hooks.useItemThumbnail}
        id={itemId || ''}
        thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
        sx={{
          width: '100%',
          objectFit: 'cover',
        }}
        size={size}
      />
    </Box>
  );
};

export default CardMediaComponent;
