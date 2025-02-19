import React, { useContext } from 'react';

import { ThumbnailSize } from '@graasp/sdk';
import { Thumbnail } from '@graasp/ui';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_ALT_TEXT,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const SearchThumbnail = ({
  itemId,
  name,
}: {
  name: string;
  itemId: string;
}) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: thumbnailUrl, isLoading: isThumbnailLoading } =
    hooks.useItemThumbnailUrl({ id: itemId, size: ThumbnailSize.Small });

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
