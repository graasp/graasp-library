import { Stack, Typography } from '@mui/material';

import { Avatar, useMobileView } from '@graasp/ui';

// eslint-disable-next-line react/function-component-definition
export function MemberAvatar({
  name,
  avatar,
  isLoading,
}: {
  readonly name: string;
  readonly avatar?: string;
  readonly isLoading?: boolean;
}) {
  const { isMobile } = useMobileView();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      gap={1}
      minWidth={0}
      mr={1}
    >
      <Avatar
        component="avatar"
        alt={`avatar of ${name}`}
        sx={{ fontSize: '14px' }}
        maxHeight={24}
        maxWidth={24}
        // use broken path to show first letter
        url={avatar?.length ? avatar : '/broken'}
        isLoading={isLoading}
      />
      {!isMobile && (
        <Typography
          align="right"
          noWrap
          variant="body2"
          sx={{
            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          {name}
        </Typography>
      )}
    </Stack>
  );
}
