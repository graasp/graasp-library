import React from 'react';

import { Link } from '@mui/material';
import type { LinkProps } from '@mui/material';

import { createLink } from '@tanstack/react-router';
import type { LinkComponent } from '@tanstack/react-router';

// eslint complains about using an empty interface that extends another one, as they are equal.
// use type alias when we do not have any additional props
type MUILinkProps = LinkProps;
// use the interface extension when we want to add more props
// interface MUILinkProps extends LinkProps {
//   // Add any additional props you want to pass to the Link
// }

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const CustomLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
