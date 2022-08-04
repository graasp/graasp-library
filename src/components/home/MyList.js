import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppBar, Tab, Tabs, makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { LIBRARY } from '@graasp/translations';

import { MY_LIST_TAB_NAMES } from '../../config/constants';
import { buildMyListNavigationTabId } from '../../config/selectors';
import MyFavorites from './MyFavorites';
import MyLikes from './MyLikes';
import MyPublishments from './MyPublishments';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  tabBar: {
    marginBottom: theme.spacing(5),
    boxShadow: 0,
  },
}));

function MyList() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <AppBar position="static" color="default" className={classes.tabBar}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="fff"
            aria-label={t(LIBRARY.MY_LISTS_TAB_ARIA_LABEL)}
          >
            <Tab
              label={t(LIBRARY.MY_LISTS_MY_FAVORITES_TAB)}
              icon={<StarBorderIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_FAVORITES)}
            />
            <Tab
              label={t(LIBRARY.MY_LISTS_MY_LIKES_TAB)}
              icon={<FavoriteBorderIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_LIKES)}
            />
            <Tab
              label={t(LIBRARY.MY_LISTS_MY_PUBLISHMENTS_TAB)}
              icon={<PublishIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_PUBLISHMENTS)}
            />
          </Tabs>
        </AppBar>
        <MyFavorites tab={tab} index={0} />
        <MyLikes tab={tab} index={1} />
        <MyPublishments tab={tab} index={2} />
      </main>
    </div>
  );
}

export default MyList;
