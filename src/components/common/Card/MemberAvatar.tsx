import { Suspense } from 'react';

import {
  Avatar as MuiAvatar,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { Account, ThumbnailSize } from '@graasp/sdk';

import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { Avatar } from '~/components/ui/Avatar/Avatar';
import { stringToColor } from '~/components/ui/Avatar/stringToColor';
import { useMobileView } from '~/components/ui/hooks/useMobileView';

import { downloadAvatarOptions } from '../../../openapi/client/@tanstack/react-query.gen';

type Props = { author: Account; size: 24 | 30 };

// public component
export function MemberAvatar(props: Readonly<Props>) {
  const { author, size } = props;
  const { isMobile } = useMobileView();

  return (
    <Link
      title={author.name}
      to="/members/$memberId"
      params={{ memberId: author.id }}
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
        <ErrorBoundary
          fallback={
            <MuiAvatar
              sx={{
                width: size,
                height: size,
                backgroundColor: stringToColor(author.name),
              }}
            >
              {author.name[0]}
            </MuiAvatar>
          }
        >
          <Suspense
            fallback={
              <Skeleton variant="circular" width={size} height={size} />
            }
          >
            <AuthorAvatar {...props} />
          </Suspense>
        </ErrorBoundary>

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
            {author.name}
          </Typography>
        )}
      </Stack>
    </Link>
  );
}

function AuthorAvatar({ author, size }: Readonly<Props>) {
  const { data: authorAvatarUrl } = useSuspenseQuery(
    downloadAvatarOptions({
      path: { id: author.id, size: ThumbnailSize.Small },
    }),
  );
  return (
    <Avatar
      id={author.name}
      alt={`${author.name} avatar`}
      sx={{ fontSize: '14px' }}
      maxHeight={size}
      maxWidth={size}
      url={authorAvatarUrl}
    />
  );
}
