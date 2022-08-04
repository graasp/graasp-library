import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LIBRARY } from '@graasp/translations';

import { Context, HOST_MAP } from '../../config/constants';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  DEFAULT_SHADOW_EFFECT,
  HEADER_HEIGHT,
  HEADER_LOGO_HEIGHT,
} from '../../config/cssStyles';
import {
  ALL_COLLECTIONS_ROUTE,
  HOME_ROUTE,
  MY_LIST_ROUTE,
} from '../../config/routes';
import {
  APP_NAVIGATION_DROP_DOWN_ID,
  HEADER_ALL_COLLECTIONS_ID,
  HEADER_GRAASP_LIBRARY_ID,
  HEADER_MY_LIST_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import UserHeader from './UserHeader';

const GraaspLogo = dynamic(
  () => import('@graasp/ui').then((mod) => mod.GraaspLogo),
  { ssr: false },
);
const Navigation = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Navigation),
  { ssr: false },
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerLeft: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    height: HEADER_HEIGHT,
  },
  header: {
    boxShadow: DEFAULT_SHADOW_EFFECT,
  },
  link: {
    textDecoration: 'none',
    color: COLOR_BLACK,
  },
  logo: {
    fill: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  spacing: {
    height: HEADER_HEIGHT,
  },
  button: {
    color: `${theme.palette.primary.main} !important`,
  },
  triangle: {
    borderTop: '5px solid #5050d2 !important',
  },
}));

function Header() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: currentMember, isError } = hooks.useCurrentMember();

  const renderMyList = () => {
    if (isError || !currentMember || currentMember.isEmpty()) {
      return null;
    }

    return (
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id={HEADER_MY_LIST_ID}
      >
        <a href={MY_LIST_ROUTE} className={classes.link}>
          {t(LIBRARY.HEADER_MY_LISTS)}
        </a>
      </Typography>
    );
  };

  return (
    <>
      <header className={classes.header}>
        <AppBar position="fixed" color={COLOR_WHITE}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.headerLeft}>
              <GraaspLogo
                height={HEADER_LOGO_HEIGHT}
                className={classes.logo}
              />
              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id={HEADER_GRAASP_LIBRARY_ID}
              >
                <a href={HOME_ROUTE} className={classes.link}>
                  Graasp
                </a>
              </Typography>
              <Navigation
                id={APP_NAVIGATION_DROP_DOWN_ID}
                currentValue={Context.LIBRARY}
                hostMap={HOST_MAP}
                buttonColor="primary"
                buttonClassname={classes.button}
                triangleClassname={classes.triangle}
              />
              <a href={ALL_COLLECTIONS_ROUTE} className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                  id={HEADER_ALL_COLLECTIONS_ID}
                >
                  {t(LIBRARY.HEADER_ALL_COLLECTIONS)}
                </Typography>
              </a>
              {renderMyList()}
            </div>
            <UserHeader />
          </Toolbar>
        </AppBar>
      </header>
      <div className={classes.spacing} />
    </>
  );
}

export default Header;
