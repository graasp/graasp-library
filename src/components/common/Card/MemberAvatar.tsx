import Link from 'next/link';

import { Stack, Typography } from '@mui/material';

import { Avatar, useMobileView } from '@graasp/ui';

export function MemberAvatar({
  name,
  link,
  avatar,
  isLoading,
}: Readonly<{
  name: string;
  link: string;
  avatar?: string;
  isLoading?: boolean;
}>) {
  const { isMobile } = useMobileView();

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
          url={avatar?.length ? avatar : 'https://broken'}
          isLoading={isLoading}
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
