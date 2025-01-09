import { Box, useTheme } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';
import { DEFAULT_LIGHT_PRIMARY_COLOR, ItemIcon, Thumbnail } from '@graasp/ui';

export type CardThumbnailProps = {
  thumbnail?: string;
  alt: string;
  width?: number;
  minHeight: number;
  type?: DiscriminatedItem['type'];
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  mimetype?: string;
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
}: CardThumbnailProps): JSX.Element => {
  const theme = useTheme();

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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
      width={width}
      height="100%"
      flexShrink={0}
      minHeight={minHeight}
      minWidth={0}
    >
      <ItemIcon
        mimetype={mimetype}
        type={type}
        alt={alt}
        color={theme.palette.primary.main}
      />
    </Box>
  );
};

export default CardThumbnail;
