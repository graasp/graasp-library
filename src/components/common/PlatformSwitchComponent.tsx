import {
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { HOST_MAP } from '../../config/paths';
import { HEADER_NAVIGATION_PLATFORM_SWITCH_ID } from '../../config/selectors';

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

interface HeaderNavigationProps {
  rootId?: string;
}

export const PlatformSwitchComponent = ({
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

  return (
    <PlatformSwitch
      id={HEADER_NAVIGATION_PLATFORM_SWITCH_ID}
      selected={Platform.Library}
      platformsProps={platformProps}
    />
  );
};

export default PlatformSwitchComponent;
