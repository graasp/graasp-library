import { Suspense } from 'react';

import { Skeleton, Stack, Typography } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { Avatar } from '~/components/ui/Avatar/Avatar';
import { useMobileView } from '~/components/ui/hooks/useMobileView';

import { downloadAvatarOptions } from '../../../openapi/client/@tanstack/react-query.gen';

type Props = { name: string; id: string };

// public component
export function AuthorAvatar(props: Props) {
  return (
    <Suspense fallback={<LoadingAuthorAvatar />}>
      <MemberAvatar {...props} />
    </Suspense>
  );
}

function LoadingAuthorAvatar() {
  return <Skeleton variant="rounded" />;
}

function MemberAvatar({ name, id }: Readonly<Props>) {
  const { isMobile } = useMobileView();
  const { data: authorAvatarUrl } = useSuspenseQuery(
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
          id={name}
          alt={`${name} avatar`}
          sx={{ fontSize: '14px' }}
          maxHeight={24}
          maxWidth={24}
          // use broken path to show first letter because we use ui avatar wrapper
          url={authorAvatarUrl}
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
