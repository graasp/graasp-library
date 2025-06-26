import { ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { downloadItemThumbnailOptions } from '~/openapi/client/@tanstack/react-query.gen';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_ALT_TEXT,
} from '../../config/constants';
import Thumbnail from '../ui/Thumbnail/Thumbnail';

const SearchThumbnail = ({
  itemId,
  name,
}: {
  name: string;
  itemId: string;
}) => {
  const { data: thumbnailUrl, isLoading: isThumbnailLoading } = useQuery(
    downloadItemThumbnailOptions({
      path: { id: itemId, size: ThumbnailSize.Small },
    }),
  );

  return (
    <Thumbnail
      url={thumbnailUrl ?? DEFAULT_ITEM_IMAGE_PATH}
      isLoading={isThumbnailLoading}
      alt={name ?? DEFAULT_THUMBNAIL_ALT_TEXT}
      id={itemId}
      sx={{
        width: '50px',
        objectFit: 'cover',
        marginRight: 1,
      }}
    />
  );
};

export default SearchThumbnail;
