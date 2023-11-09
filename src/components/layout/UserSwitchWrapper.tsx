import dynamic from 'next/dynamic';

import { FC, useContext } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

import { MEMBER_AVATAR_ICON_SIZE } from '../../config/constants';
import { GRAASP_ACCOUNT_HOST } from '../../config/env';
import { useLibraryTranslation } from '../../config/i18n';
import { SIGN_IN_ROUTE } from '../../config/paths';
import { MY_LIKED_ITEMS_ROUTE } from '../../config/routes';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import MemberAvatar from './MemberAvatar';

const { GraaspUserSwitch } = {
  GraaspUserSwitch: dynamic(
    () => import('@graasp/ui').then((mod) => mod.UserSwitchWrapper),
    { ssr: false },
  ),
};

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper: FC<Props> = ({ ButtonContent }) => {
  const { hooks, mutations } = useContext(QueryClientContext);
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();
  const { t } = useLibraryTranslation();

  const userItems = [
    {
      icon: <FavoriteIcon fontSize="large" />,
      text: t(LIBRARY.LIKED_ITEMS),
      redirect_path: MY_LIKED_ITEMS_ROUTE,
    },
  ];
  return (
    <Box mr={1}>
      <GraaspUserSwitch
        userMenuItems={userItems}
        ButtonContent={ButtonContent}
        signOut={signOut}
        currentMember={member}
        isCurrentMemberLoading={isLoading}
        profilePath={GRAASP_ACCOUNT_HOST}
        redirectPath={SIGN_IN_ROUTE}
        renderAvatar={(m) => (
          <MemberAvatar
            sx={{ mr: 1 }}
            size={MEMBER_AVATAR_ICON_SIZE}
            memberId={m?.id}
          />
        )}
      />
    </Box>
  );
};

export default UserSwitchWrapper;
