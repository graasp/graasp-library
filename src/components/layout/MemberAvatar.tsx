import React from 'react';
import type { JSX } from 'react';

import { Box, SxProps } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import {
  downloadAvatarOptions,
  getOneMemberOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import { SMALL_AVATAR_ICON_SIZE } from '../../config/constants';
import { Avatar } from '../ui/Avatar/Avatar';

type Props = {
  id?: string;
  memberId: string;
  size?: number;
  sx?: SxProps;
};

const MemberAvatar = React.forwardRef<HTMLDivElement, Props>(
  (
    { id, memberId, size = SMALL_AVATAR_ICON_SIZE, ...otherProps },
    ref,
  ): JSX.Element => {
    const { data: member } = useQuery(
      getOneMemberOptions({ path: { id: memberId } }),
    );
    const { data: avatarUrl } = useQuery(
      downloadAvatarOptions({
        path: {
          id: memberId,
          size: ThumbnailSize.Small,
        },
      }),
    );

    return (
      <Box id={id} ref={ref} {...otherProps}>
        <Avatar
          url={avatarUrl}
          alt={member && avatarUrl ? m.AVATAR_ALT({ name: member?.name }) : ''}
          maxWidth={size}
          maxHeight={size}
          sx={{
            maxWidth: size,
            maxHeight: size,
          }}
          id={`avatar-${member?.id}`}
        />
      </Box>
    );
  },
);

export default MemberAvatar;
