import { Box } from '@mui/material';

import { ThumbnailSize, ThumbnailSizeType } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { downloadItemThumbnailOptions } from '~/openapi/client/@tanstack/react-query.gen';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_ALT_TEXT,
} from '../../config/constants';
import Thumbnail from '../ui/Thumbnail/Thumbnail';

type Props = {
  name: string;
  itemId: string;
  size: ThumbnailSizeType;
};

const CardMediaComponent = ({
  name,
  itemId,
  size = ThumbnailSize.Small,
}: Props) => {
  const { data: thumbnailUrl, isPending: isThumbnailLoading } = useQuery(
    downloadItemThumbnailOptions({ path: { id: itemId, size } }),
  );
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
          padding: `15%`,
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
