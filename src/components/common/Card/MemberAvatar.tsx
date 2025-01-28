import { Stack, Typography } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { Avatar, useMobileView } from '@graasp/ui';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { downloadAvatarOptions } from '../../../openapi/client/@tanstack/react-query.gen';

export function MemberAvatar({
  name,
  link,
  id,
}: Readonly<{
  name: string;
  link: string;
  id: string;
}>) {
  const { isMobile } = useMobileView();
  const { data: authorAvatarUrl, isPending: isPendingAvatar } = useQuery(
    downloadAvatarOptions({
      path: { id, size: ThumbnailSize.Small },
      query: { replyUrl: true },
    }),
  );

  return (
    <Link
      title={name}
      href={link}
      style={{
        textDecoration: 'unset',
        color: 'unset',
        minWidth: 0,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={1}
        minWidth={0}
      >
        <Avatar
          component="avatar"
          alt={`${name} avatar`}
          sx={{ fontSize: '14px' }}
          maxHeight={24}
          maxWidth={24}
          // use broken path to show first letter because we use ui avatar wrapper
          url={authorAvatarUrl?.length ? authorAvatarUrl : 'https://broken'}
          isLoading={isPendingAvatar}
        />
        {!isMobile && (
          <Typography
            align="right"
            noWrap
            variant="body2"
            sx={{
              '&:hover': {
                cursor: 'pointer',
                opacity: 0.7,
              },
            }}
          >
            {name}
          </Typography>
        )}
      </Stack>
    </Link>
  );
}
