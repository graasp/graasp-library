import Link from 'next/link';

import React from 'react';

import {
  Box,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { GraaspLogo, PlatformSwitch } from '@graasp/ui';

import { APP_NAME } from '../../config/constants';
import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import { HOST_MAP } from '../../config/paths';

// TODO: use graasp-ui when window conflict is resolved
// meanwhile we copy the definitions here
export enum Platform {
  Builder = 'Builder',
  Player = 'Player',
  Library = 'Library',
  Analytics = 'Analytics',
}

// TODO: use graasp-ui when window conflict is resolved
// meanwhile we copy the definitions here
export type HostsMapper = Partial<
  Record<Platform, (itemId?: string) => string | undefined>
>;

// TODO: use graasp-ui when window conflict is resolved
// meanwhile we copy the definitions here
export function defaultHostsMapper(
  hostsUrls: Partial<Record<Platform, string>>,
): HostsMapper {
  const urlBuilders = {
    [Platform.Builder]: (origin: string, itemId: string) =>
      `${origin}/items/${itemId}`,
    [Platform.Player]: (origin: string, itemId: string) =>
      `${origin}/${itemId}`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [Platform.Library]: (origin: string, itemId: string) => origin,
    [Platform.Analytics]: (origin: string, itemId: string) =>
      `${origin}/items/${itemId}`,
  };

  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const { origin } = new URL(url);
      return [
        platform,
        // if passed itemId is undefined, redirect to home page of platform
        (itemId: string) =>
          itemId ? urlBuilders[platform as Platform](origin, itemId) : origin,
      ];
    }),
  ) as HostsMapper;
}

// TODO: use graasp-ui when window conflict is resolved
// meanwhile we copy the definitions here
export function usePlatformNavigation(
  hostsMapper: HostsMapper,
  itemId?: string,
) {
  return (platform: Platform) => {
    const url = hostsMapper[platform]?.(itemId);
    const href = url ?? '#';
    return {
      href,
    };
  };
}

export const APP_NAVIGATION_PLATFORM_SWITCH_ID = 'appNavigationPlatformSwitch';
export const APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS = {
  [Platform.Builder]: 'appNavigationPlatformSwitchButtonBuilder',
  [Platform.Player]: 'appNavigationPlatformSwitchButtonPlayer',
  [Platform.Library]: 'appNavigationPlatformSwitchButtonLibrary',
  [Platform.Analytics]: 'appNavigationPlatformSwitchButtonAnalytics',
};

// small converter for HOST_MAP into a usePlatformNavigation mapper
export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP.builder,
  [Platform.Player]: HOST_MAP.player,
  [Platform.Analytics]: HOST_MAP.analytics,
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}));

interface HeaderNavigationProps {
  rootId?: string;
}

export const HeaderNavigation = ({
  rootId,
}: HeaderNavigationProps): JSX.Element => {
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, rootId);

  const platformProps = {
    [Platform.Builder]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Builder],
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Player],
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Library]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Library],
      href: '/',
    },
    [Platform.Analytics]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Analytics],
      ...getNavigationEvents(Platform.Analytics),
    },
  };
  const theme = useTheme();
  const hasSpace = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box display="flex">
      <StyledLink href="/">
        <GraaspLogo height={HEADER_LOGO_HEIGHT} sx={{ fill: 'white' }} />
        {hasSpace && (
          <Typography variant="h6" color="inherit" ml={1}>
            {APP_NAME}
          </Typography>
        )}
      </StyledLink>
      <PlatformSwitch
        id={APP_NAVIGATION_PLATFORM_SWITCH_ID}
        selected={Platform.Library}
        platformsProps={platformProps}
        disabledColor="#999"
      />
    </Box>
  );
};

export default HeaderNavigation;
