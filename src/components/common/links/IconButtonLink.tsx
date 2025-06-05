import React from 'react';

import { IconButton, IconButtonProps } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUIButtonProps extends Omit<IconButtonProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUIButtonProps>(
  (props, ref) => <IconButton component="a" ref={ref} {...props} />,
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const IconButtonLink: LinkComponent<typeof MUILinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
