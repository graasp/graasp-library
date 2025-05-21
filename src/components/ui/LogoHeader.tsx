import type { JSX } from 'react';

import { Stack, Typography } from '@mui/material';

import GraaspLogo from './icons/GraaspLogo';

export function LogoHeader(): JSX.Element {
  return (
    <Stack
      direction="row"
      alignItems="center"
      textTransform="none"
      color="inherit"
    >
      <GraaspLogo height={40} sx={{ fill: 'white' }} />
      <Typography
        sx={{ display: { xs: 'none', sm: 'block' } }}
        color="currentcolor"
        variant="h6"
      >
        Graasp
      </Typography>
    </Stack>
  );
}
