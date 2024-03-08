import { Box, Stack } from '@mui/material';

import { Context } from '@graasp/sdk';
import { Main } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import PlatformSwitchComponent from '../common/PlatformSwitchComponent';
import DrawerContent from './DrawerContent';
import Footer from './Footer';
import HeaderLinkComponent from './StyledLink';
import useHeader from './useHeader';

const MainWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { rightContent } = useHeader();
  const { t } = useLibraryTranslation();

  return (
    <Main
      open={false}
      context={Context.Library}
      headerRightContent={rightContent}
      drawerContent={<DrawerContent />}
      drawerOpenAriaLabel={t(LIBRARY.DRAWER_ARIA_OPEN)}
      PlatformComponent={<PlatformSwitchComponent />}
      LinkComponent={HeaderLinkComponent}
    >
      <Stack direction="column" justifyItems="space-between" height="100%">
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Stack>
    </Main>
  );
};
export default MainWrapper;
