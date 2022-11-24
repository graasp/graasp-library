import dynamic from 'next/dynamic';

import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountCircle } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import { LoginModalContext } from '../common/SignInModalContext';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const UserHeader: FC = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user, isLoading, isError } = hooks.useCurrentMember();
  const { setOpen: openLoginModal } = useContext(LoginModalContext);

  const { data: avatarBlob, avatarIsLoading } = hooks.useAvatar({
    id: user?.id,
  });

  const onSignedOutIconClick = () => {
    openLoginModal(true);
  };

  if (isLoading || isError || !user?.id || avatarIsLoading) {
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
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          blob={avatarBlob}
          alt={t(LIBRARY.AVATAR_ALT, { name: username })}
          defaultImage={DEFAULT_MEMBER_THUMBNAIL}
          component="avatar"
        />
      </Grid>
      <Grid item>
        <Typography ml={1} variant="body2">
          {username}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserHeader;
