import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import { AccountCircle } from '@material-ui/icons';

import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import { LoginModalContext } from '../common/SignInModalContext';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  username: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    color: theme.palette.primary.main,
    backgroundColor: grey[200],
  },
}));

const UserHeader = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: user, isLoading, isError } = hooks.useCurrentMember();
  const classes = useStyles();
  const { setOpen: openLoginModal } = useContext(LoginModalContext);

  const onSignedOutIconClick = () => {
    openLoginModal(true);
  };

  if (isLoading || isError || user?.isEmpty()) {
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

  const username = user?.get('name');
  return (
    <>
      <Avatar
        useAvatar={hooks.useAvatar}
        alt={t(LIBRARY.AVATAR_ALT, { name: username })}
        className={classes.avatar}
        defaultImage={DEFAULT_MEMBER_THUMBNAIL}
        id={user?.get('id')}
        extra={user?.get('extra')}
        component="avatar"
      />
      <Typography className={classes.username} variant="body2">
        {username}
      </Typography>
    </>
  );
};

export default UserHeader;
