import dynamic from 'next/dynamic';

import { FC, useContext } from 'react';

import Box from '@mui/material/Box';

import { BUILDER } from '@graasp/translations';

import { MEMBER_AVATAR_ICON_SIZE } from '../../config/constants';
import { DOMAIN } from '../../config/env';
import { useBuilderTranslation } from '../../config/i18n';
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
  const {
    data: member,
    isLoading,
    isSuccess: isSuccessUser,
  } = hooks.useCurrentMember();
  const { t: translateBuilder } = useBuilderTranslation();
  const { mutateAsync: signOut } = mutations.useSignOut();

  return (
    <Box mr={1}>
      <GraaspUserSwitch
        ButtonContent={ButtonContent}
        signOut={signOut}
        currentMember={member}
        isCurrentMemberLoading={isLoading}
        isCurrentMemberSuccess={isSuccessUser}
        seeProfileText={translateBuilder(BUILDER.USER_SWITCH_PROFILE_BUTTON)}
        signedOutTooltipText={translateBuilder(
          BUILDER.USER_SWITCH_SIGNED_OUT_TOOLTIP,
        )}
        signOutText={translateBuilder(BUILDER.USER_SWITCH_SIGN_OUT_BUTTON)}
        profilePath={MEMBER_PROFILE_ROUTE}
        domain={DOMAIN}
        redirectPath={SIGN_IN_ROUTE}
        useMembers={hooks.useMembers}
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
