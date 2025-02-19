import React, { useContext } from 'react';

import { Box } from '@mui/material';

import { ThumbnailSize, ThumbnailSizeType } from '@graasp/sdk';
import { Thumbnail } from '@graasp/ui';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_ALT_TEXT,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

type Props = {
  name?: string;
  itemId?: string;
  size?: ThumbnailSizeType;
  svgPadding?: number;
};

const CardMediaComponent = ({
  name,
  itemId,
  size = ThumbnailSize.Small,
  svgPadding = 15,
}: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: thumbnailUrl, isLoading: isThumbnailLoading } =
    hooks.useItemThumbnailUrl({ id: itemId, size });
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
        url={thumbnailUrl ?? DEFAULT_ITEM_IMAGE_PATH}
        isLoading={isThumbnailLoading}
        alt={name ?? DEFAULT_THUMBNAIL_ALT_TEXT}
        id={itemId}
        sx={{
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default CardMediaComponent;
