import { forwardRef } from 'react';

import { MenuItem, type MenuItemProps } from '@mui/material';

import type { LinkComponent } from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';

// eslint complains about using an empty interface that extends another one, as they are equal.
// use type alias when we do not have any additional props
type MUIMenuItemProps = MenuItemProps;
// use the interface extension when we want to add more props
// interface MUILinkProps extends LinkProps {
//   // Add any additional props you want to pass to the Link
// }

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUIMenuItemProps>(
  (props, ref) => <MenuItem ref={ref} component="a" {...props} />,
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const MenuItemLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
