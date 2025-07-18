import type { JSX } from 'react';

import { Stack } from '@mui/material';

import { type DiscriminatedItem, ItemType } from '@graasp/sdk';

import Thumbnail from '~/components/ui/Thumbnail/Thumbnail';
import { ItemIcon } from '~/components/ui/icons/ItemIcon';

import { getColorFromId } from '../../../utils/colors';

export type CardThumbnailProps = {
  thumbnail?: string | null;
  alt: string;
  width?: number | string;
  minHeight: number;
  type?: DiscriminatedItem['type'];
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  mimetype?: string;
  id: string;
};
const CardThumbnail = ({
  thumbnail,
  alt,
  width,
  minHeight,
  minWidth,
  height,
  maxHeight = '100%',
  type = ItemType.FOLDER,
  mimetype,
  id,
}: CardThumbnailProps): JSX.Element => {
  if (thumbnail) {
    return (
      <Thumbnail
        url={thumbnail}
        alt={alt}
        height={height}
        maxHeight={maxHeight}
        maxWidth={width}
        minWidth={minWidth}
      />
    );
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      bgcolor={getColorFromId(id, 0.84)}
      width={width}
      height="100%"
      flexShrink={0}
      minHeight={minHeight}
      minWidth={0}
      sx={
        {
          //   '&:hover': {
          //     cursor: 'pointer',
          // opacity: 0.9,
          //   },
        }
      }
    >
      <ItemIcon
        mimetype={mimetype}
        type={type}
        color={getColorFromId(id, 0.5)}
      />
    </Stack>
  );
};

export default CardThumbnail;
