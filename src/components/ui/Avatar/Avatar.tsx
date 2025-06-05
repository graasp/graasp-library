import type { JSX } from 'react';

import { Avatar as AvatarComponent, SxProps } from '@mui/material';

import { DEFAULT_MEMBER_THUMBNAIL } from '~/config/constants.js';

type AvatarProps = {
  alt: string;
  id: string;
  maxHeight?: string | number;
  maxWidth?: string | number;
  sx?: SxProps;
  url?: string | void;
};

export function Avatar({
  sx,
  id,
  alt = 'avatar',
  maxWidth = '40px',
  maxHeight = '40px',
  url,
}: AvatarProps): JSX.Element | null {
  // check if the url is a string and is not empty
  return (
    <AvatarComponent
      id={id}
      alt={alt}
      src={url ?? DEFAULT_MEMBER_THUMBNAIL}
      sx={{
        width: maxWidth,
        height: maxHeight,
        ...sx,
      }}
      title={alt}
    />
  );
}
