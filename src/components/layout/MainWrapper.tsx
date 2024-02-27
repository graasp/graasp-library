import { Context } from '@graasp/sdk';
import { Main } from '@graasp/ui';

import PlatformSwitchComponent from '../common/PlatformSwitchComponent';
import DrawerContent from './DrawerContent';
import HeaderLinkComponent from './StyledLink';
import useHeader from './useHeader';

const MainWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { rightContent } = useHeader();

  return (
    <Main
      open={false}
      context={Context.Library}
      headerRightContent={rightContent}
      drawerContent={<DrawerContent />}
      drawerOpenAriaLabel="open drawer"
      PlatformComponent={<PlatformSwitchComponent />}
      LinkComponent={HeaderLinkComponent}
    >
      {children}
    </Main>
  );
};
export default MainWrapper;
