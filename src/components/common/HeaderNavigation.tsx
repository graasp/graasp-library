import dynamic from 'next/dynamic';

import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, styled } from '@mui/material';

import { redirect } from '@graasp/sdk';

import { APP_NAME, HOST_MAP } from '../../config/constants';
import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';

const GraaspLogo = dynamic(
  () => import('@graasp/ui').then((mod) => mod.GraaspLogo),
  {
    ssr: false,
  },
);
const PlatformSwitch = dynamic(
  () => import('@graasp/ui').then((mod) => mod.PlatformSwitch),
  {
    ssr: false,
  },
);

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
  const transformUrls: Record<string, (origin: string) => string> = {
    [Platform.Builder]: (origin: string) => `${origin}/items`,
  };

  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const { origin } = new URL(url);
      const path = transformUrls[platform]?.(origin) ?? origin;
      return [
        platform,
        // if passed itemId is undefined, redirect to home page of platform
        (itemId: string) => (itemId ? `${path}/${itemId}` : origin),
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
      onClick: () => redirect(href),
      onMouseDown: (event: MouseEvent) => {
        if (event.button !== 1 || url === undefined) {
          return;
        }
        window.open(href, '_blank');
      },
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
});

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

interface HeaderNavigationProps {
  rootId?: string;
  topItemName?: string;
}

export const HeaderNavigation = ({
  rootId,
  topItemName,
}: HeaderNavigationProps): JSX.Element => {
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, rootId);

  const platformProps = {
    [Platform.Builder]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Builder],
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Player],
    },
    [Platform.Library]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Library],
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Analytics],
      disabled: true,
    },
  };
  return (
    <Box display="flex" ml={2}>
      <StyledLink to="/">
        <GraaspLogo height={HEADER_LOGO_HEIGHT} sx={{ fill: 'white' }} />
        <Typography variant="h6" color="inherit" mr={2} ml={1}>
          {APP_NAME}
        </Typography>
      </StyledLink>
      <PlatformSwitch
        id={APP_NAVIGATION_PLATFORM_SWITCH_ID}
        selected={Platform.Player}
        platformsProps={platformProps}
        disabledColor="#999"
      />
      <Box display="flex" sx={{ alignItems: 'center', ml: 3 }}>
        <Typography>{topItemName}</Typography>
      </Box>
    </Box>
  );
};

export default HeaderNavigation;
