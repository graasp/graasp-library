import React from 'react';

import { Typography, TypographyProps } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUITypographyProps extends Omit<TypographyProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = React.forwardRef<
  HTMLAnchorElement,
  MUITypographyProps
>((props, ref) => <Typography component="a" ref={ref} {...props} />);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const TypographyLink: LinkComponent<typeof MUILinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
