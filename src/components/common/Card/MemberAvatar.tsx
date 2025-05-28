import { Stack, Typography } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import Avatar from '~/components/ui/Avatar/Avatar';
import { useMobileView } from '~/components/ui/hooks/useMobileView';

import { downloadAvatarOptions } from '../../../openapi/client/@tanstack/react-query.gen';

export function MemberAvatar({
  name,
  id,
}: Readonly<{
  name: string;
  id: string;
}>) {
  const { isMobile } = useMobileView();
  const { data: authorAvatarUrl, isPending: isPendingAvatar } = useQuery(
    downloadAvatarOptions({
      path: { id, size: ThumbnailSize.Small },
    }),
  );
  return (
    <Link
      title={name}
      to="/members/$memberId"
      params={{ memberId: id }}
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
          url={authorAvatarUrl}
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
