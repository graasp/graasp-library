import React from 'react';

import { Link, Stack, Typography } from '@mui/material';
import type { StackProps } from '@mui/material';

import { createLink } from '@tanstack/react-router';
import type { LinkComponent } from '@tanstack/react-router';

import GraaspLogo from '../ui/icons/GraaspLogo';

// eslint complains about using an empty interface that extends another one, as they are equal.
// use type alias when we do not have any additional props
type MUIStackProps = StackProps;
// use the interface extension when we want to add more props
// interface MUILinkProps extends LinkProps {
//   // Add any additional props you want to pass to the Link
// }

const MUILinkComponent = React.forwardRef<HTMLDivElement, MUIStackProps>(
  (props, ref) => (
    <Stack
      component={Link}
      ref={ref}
      direction="row"
      alignItems="center"
      textTransform="none"
      color="inherit"
      {...props}
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
  ),
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const LogoHeaderButton: LinkComponent<typeof MUILinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
