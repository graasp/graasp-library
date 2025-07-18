import React, { Suspense } from 'react';

import { Divider, IconButton, Menu, MenuItem, Skeleton } from '@mui/material';
import type { MenuItemProps } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createLink, useLoaderData } from '@tanstack/react-router';
import type { LinkComponent } from '@tanstack/react-router';

import { getCurrentAccount, signOut } from '~/openapi/client';
import {
  downloadAvatarOptions,
  getCurrentAccountOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import { useCurrentLocation } from '../common/ShareButtons';
import { ButtonLink } from '../common/links/ButtonLink';
import { Avatar } from '../ui/Avatar/Avatar';

// User avatar component that uses suspense for loading
export function UserAvatar() {
  return (
    <ErrorBoundary fallback={<LoggedOutUser />}>
      <Suspense fallback={<LoadingUserAvatar />}>
        <SuspendedUserAvatar />
      </Suspense>
    </ErrorBoundary>
  );
}

export function SuspendedUserAvatar() {
  const queryClient = useQueryClient();
  const { clientOrigin } = useLoaderData({ from: '__root__' });
  const { data: currentMember } = useSuspenseQuery({
    ...getCurrentAccountOptions(),
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getCurrentAccount({
        ...queryKey[0],
        signal,
        throwOnError: false,
      });
      return data ?? null;
    },
    retry: 0,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (currentMember) {
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const homeLink = `${clientOrigin}/home`;
    const settingsLink = `${clientOrigin}/account/settings`;

    return (
      <>
        <IconButton onClick={handleClick}>
          <AvatarDisplay currentUserId={currentMember.id} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItemLink to={homeLink}>{m.USER_MENU_HOME()}</MenuItemLink>
          <MenuItemLink to={settingsLink}>
            {m.USER_MENU_SETTINGS()}
          </MenuItemLink>
          <Divider flexItem />
          <MenuItem
            onClick={async () => {
              await signOut();
              // force-reload of queries
              queryClient.resetQueries();
            }}
          >
            {m.LOG_OUT()}
          </MenuItem>
        </Menu>
      </>
    );
  }

  //default to logged out user if we can't fetch
  return <LoggedOutUser />;
}

function AvatarDisplay({ currentUserId }: Readonly<{ currentUserId: string }>) {
  const { data: avatarUrl } = useSuspenseQuery({
    ...downloadAvatarOptions({
      path: { id: currentUserId, size: ThumbnailSize.Small },
    }),
    retry: 0,
  });
  return <Avatar id={currentUserId} alt={currentUserId} url={avatarUrl} />;
}

export function LoadingUserAvatar() {
  return <Skeleton variant="circular" sx={{ m: 1 }} width={40} height={40} />;
}

function LoggedOutUser() {
  const { clientOrigin } = useLoaderData({ from: '__root__' });
  const currentLocation = useCurrentLocation();

  const logInLink = `${clientOrigin}/auth/login?url=${
    // need to url encode the return url
    encodeURIComponent(currentLocation ?? '')
  }`;

  return (
    <ButtonLink sx={{ color: 'white' }} to={logInLink}>
      {m.LOG_IN()}
    </ButtonLink>
  );
}

// eslint complains about using an empty interface that extends another one, as they are equal.
// use type alias when we do not have any additional props
type MUIMenuItemProps = MenuItemProps;
// use the interface extension when we want to add more props
// interface MUILinkProps extends LinkProps {
//   // Add any additional props you want to pass to the Link
// }

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUIMenuItemProps>(
  (props, ref) => <MenuItem ref={ref} component="a" {...props} />,
);

const CreatedLinkComponent = createLink(MUILinkComponent);

const MenuItemLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
