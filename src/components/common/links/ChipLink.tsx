import React from 'react';

import { Chip, ChipProps } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint complains about using an empty interface that extends another one, as they are equal.
// use type alias when we do not have any additional props
type MUIChipProps = ChipProps;
// use the interface extension when we want to add more props
// interface MUILinkProps extends LinkProps {
//   // Add any additional props you want to pass to the Link
// }

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUIChipProps>(
  (props, ref) => <Chip component="a" ref={ref} {...props} />,
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const ChipLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
