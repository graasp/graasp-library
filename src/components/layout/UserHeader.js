import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import { LoginModalContext } from '../common/SignInModalContext';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const UserHeader = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user, isLoading, isError } = hooks.useCurrentMember();
  const { setOpen: openLoginModal } = useContext(LoginModalContext);

  const onSignedOutIconClick = () => {
    openLoginModal(true);
  };

  if (isLoading || isError || !user?.id) {
    return (
      <IconButton
        edge="end"
        aria-label={t(LIBRARY.PROFILE_BUTTON)}
        aria-haspopup="true"
        onClick={onSignedOutIconClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  }

  const username = user.name;
  return (
    <>
      <Avatar
        useAvatar={hooks.useAvatar}
        alt={t(LIBRARY.AVATAR_ALT, { name: username })}
        defaultImage={DEFAULT_MEMBER_THUMBNAIL}
        id={user.id}
        extra={user.extra}
        component="avatar"
      />
      <Typography ml={1} variant="body2">
        {username}
      </Typography>
    </>
  );
};

export default UserHeader;
