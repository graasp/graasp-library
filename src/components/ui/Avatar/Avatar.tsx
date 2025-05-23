import type { JSX } from 'react';

import {
  Avatar as AvatarComponent,
  Skeleton,
  SkeletonProps,
  SxProps,
} from '@mui/material';

import { DEFAULT_MEMBER_THUMBNAIL } from '~/config/constants.js';

import Thumbnail from '../Thumbnail/Thumbnail.js';

type AvatarProps = {
  alt: string;
  /**
   * component used to display the avatar (img or avatar)
   */
  component?: 'img' | 'avatar';
  id?: string;
  isLoading?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  sx?: SxProps;
  url?: string | void;
  /**
   * skeleton variant
   */
  variant?: SkeletonProps['variant'];
};

const Avatar = ({
  sx,
  id,
  alt = 'avatar',
  maxWidth = '40px',
  maxHeight = '40px',
  variant = 'circular',
  component = 'avatar',
  isLoading,
  url,
}: AvatarProps): JSX.Element | null => {
  if (component === 'avatar') {
    // check if the url is a string and is not empty
    if (typeof url === 'string' && url !== '') {
      return (
        <AvatarComponent
          id={id}
          alt={alt}
          src={url}
          sx={{
            width: maxWidth,
            height: maxHeight,
            ...sx,
          }}
          title={alt}
        />
      );
    } else {
      if (isLoading) {
        return (
          <Skeleton
            variant={variant}
            sx={sx}
            width={maxWidth}
            height={maxHeight}
          />
        );
      }
      return (
        <AvatarComponent
          id={id}
          alt={alt}
          sx={{
            width: maxWidth,
            height: maxHeight,
            ...sx,
          }}
          src={DEFAULT_MEMBER_THUMBNAIL}
          title={alt}
        />
      );
    }
  }

  return (
    <Thumbnail
      sx={sx}
      alt={alt}
      id={id}
      url={url}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      variant={variant}
      isLoading={isLoading}
    />
  );
};

export default Avatar;
