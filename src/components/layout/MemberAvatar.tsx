import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, SxProps } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_MEMBER_THUMBNAIL,
  SMALL_AVATAR_ICON_SIZE,
} from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';

const { Avatar } = {
  Avatar: dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
    ssr: false,
  }),
};

type Props = {
  id?: string;
  memberId?: string;
  size?: number;
  sx?: SxProps;
};

const MemberAvatar = React.forwardRef<HTMLDivElement, Props>(
  (
    { id, memberId, size = SMALL_AVATAR_ICON_SIZE, ...otherProps },
    ref,
  ): JSX.Element => {
    const { hooks } = useContext(QueryClientContext);
    const { t } = useTranslation();
    const { data: member, isLoading, isFetching } = hooks.useMember(id);
    const {
      data: avatarUrl,
      isLoading: isLoadingAvatar,
      isFetching: isFetchingAvatar,
    } = hooks.useAvatarUrl({
      id: memberId,
      size: ThumbnailSize.Small,
    });

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Box id={id} ref={ref} {...otherProps}>
        <Avatar
          isLoading={
            isLoading || isLoadingAvatar || isFetchingAvatar || isFetching
          }
          url={avatarUrl ?? DEFAULT_MEMBER_THUMBNAIL}
          alt={
            member && avatarUrl
              ? t(LIBRARY.AVATAR_ALT, { name: member?.name })
              : ''
          }
          component="avatar"
          maxWidth={size}
          maxHeight={size}
          sx={{
            maxWidth: size,
            maxHeight: size,
          }}
        />
      </Box>
    );
  },
);

export default MemberAvatar;
