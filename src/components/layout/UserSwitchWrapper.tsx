import { useContext } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { MEMBER_AVATAR_ICON_SIZE } from '../../config/constants';
import { GRAASP_ACCOUNT_HOST } from '../../config/env';
import { useLibraryTranslation } from '../../config/i18n';
import { SIGN_IN_ROUTE } from '../../config/paths';
import { MY_LIKED_ITEMS_ROUTE, buildMemberRoute } from '../../config/routes';
import { USER_SWITCH_BUTTON_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import MemberAvatar from './MemberAvatar';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props) => {
  const { hooks, mutations } = useContext(QueryClientContext);
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();
  const { t } = useLibraryTranslation();

  const userItems = [
    {
      icon: <LocalLibraryIcon fontSize="large" />,
      text: t(LIBRARY.PUBLIC_PROFILE),
      redirect_path: buildMemberRoute(member?.id),
    },
    {
      icon: <FavoriteIcon fontSize="large" />,
      text: t(LIBRARY.LIKED_ITEMS),
      redirect_path: MY_LIKED_ITEMS_ROUTE,
    },
  ];
  return (
    <GraaspUserSwitch
      buttonId={USER_SWITCH_BUTTON_ID}
      userMenuItems={userItems}
      ButtonContent={ButtonContent}
      signOut={signOut}
      currentMember={member}
      isCurrentMemberLoading={isLoading}
      profilePath={GRAASP_ACCOUNT_HOST}
      redirectPath={SIGN_IN_ROUTE}
      renderAvatar={(m) => (
        <MemberAvatar size={MEMBER_AVATAR_ICON_SIZE} memberId={m?.id} />
      )}
    />
  );
};

export default UserSwitchWrapper;
