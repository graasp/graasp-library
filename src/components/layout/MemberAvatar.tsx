import React, { useContext } from 'react';

import { Box, SxProps } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import {
  DEFAULT_MEMBER_THUMBNAIL,
  SMALL_AVATAR_ICON_SIZE,
} from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';

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
    const { t } = useLibraryTranslation();
    const { data: member, isPending, isFetching } = hooks.useMember(memberId);
    const {
      data: avatarUrl,
      isPending: isPendingAvatar,
      isFetching: isFetchingAvatar,
    } = hooks.useAvatarUrl({
      id: memberId,
      size: ThumbnailSize.Small,
    });

    return (
      <Box id={id} ref={ref} {...otherProps}>
        <Avatar
          isLoading={
            isPending || isPendingAvatar || isFetchingAvatar || isFetching
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
