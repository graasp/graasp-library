import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import dynamic from 'next/dynamic';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Typography } from '@material-ui/core';
import { LoginModalContext } from '../common/LoginModalContext';
import { QueryClientContext } from '../QueryClientContext';
import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';

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
        aria-label={t('Account')}
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
        alt={t(`someone's avatar`, { name: username })}
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
