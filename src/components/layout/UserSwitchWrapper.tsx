import dynamic from 'next/dynamic';

import { FC, useContext } from 'react';

import Box from '@mui/material/Box';

import { MEMBER_AVATAR_ICON_SIZE } from '../../config/constants';
import { MEMBER_PROFILE_ROUTE, SIGN_IN_ROUTE } from '../../config/paths';
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

  return (
    <Box mr={1}>
      <GraaspUserSwitch
        ButtonContent={ButtonContent}
        signOut={signOut}
        currentMember={member}
        isCurrentMemberLoading={isLoading}
        profilePath={MEMBER_PROFILE_ROUTE}
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
