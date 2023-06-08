import { RecordOf } from 'immutable';
import dynamic from 'next/dynamic';

import React, { FC, useContext } from 'react';

import Box from '@mui/material/Box';

import { MUTATION_KEYS } from '@graasp/query-client';
import { Member } from '@graasp/sdk';
import { BUILDER } from '@graasp/translations';

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
  const { hooks, useMutation } = useContext(QueryClientContext);
  const {
    data: member,
    isLoading,
    isSuccess: isSuccessUser,
  } = hooks.useCurrentMember();
  const { t: translateBuilder } = useBuilderTranslation();
  const { mutateAsync: signOut } = useMutation<unknown, unknown, string>(
    MUTATION_KEYS.SIGN_OUT,
  );
  const { mutate: switchMember } = useMutation(MUTATION_KEYS.SWITCH_MEMBER);

  const renderAvatar = (m: RecordOf<Member>) => <MemberAvatar id={m.id} />;

  return (
    <Box mr={1}>
      <GraaspUserSwitch
        ButtonContent={ButtonContent}
        signOut={signOut}
        currentMember={member}
        isCurrentMemberLoading={isLoading}
        isCurrentMemberSuccess={isSuccessUser}
        // fix in query client
        switchMember={switchMember as any}
        seeProfileText={translateBuilder(BUILDER.USER_SWITCH_PROFILE_BUTTON)}
        signedOutTooltipText={translateBuilder(
          BUILDER.USER_SWITCH_SIGNED_OUT_TOOLTIP,
        )}
        signOutText={translateBuilder(BUILDER.USER_SWITCH_SIGN_OUT_BUTTON)}
        switchMemberText={translateBuilder(
          BUILDER.USER_SWITCH_SWITCH_USER_TEXT,
        )}
        profilePath={MEMBER_PROFILE_ROUTE}
        domain={DOMAIN}
        redirectPath={SIGN_IN_ROUTE}
        useMembers={hooks.useMembers}
        renderAvatar={renderAvatar as any}
      />
    </Box>
  );
};

export default UserSwitchWrapper;
