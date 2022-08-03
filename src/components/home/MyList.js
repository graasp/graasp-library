import { makeStyles, Typography, Tab, AppBar, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import {
  TITLE_TEXT_ID,
  buildMyListNavigationTabId,
} from '../../config/selectors';
import MyFavorites from './MyFavorites';
import MyLikes from './MyLikes';
import MyPublishments from './MyPublishments';
import { MY_LIST_TAB_NAMES } from '../../config/constants';

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
            aria-label={t('Navigation tabs')}
          >
            <Tab
              label={t('My Favorites')}
              icon={<StarBorderIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_FAVORITES)}
            />
            <Tab
              label={t('My Likes')}
              icon={<FavoriteBorderIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_LIKES)}
            />
            <Tab
              label={t('My Publishments')}
              icon={<PublishIcon />}
              id={buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_PUBLISHMENTS)}
            />
          </Tabs>
        </AppBar>
        <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
          {t('My Collections')}
        </Typography>
        <MyFavorites tab={tab} index={0} />
        <MyLikes tab={tab} index={1} />
        <MyPublishments tab={tab} index={2} />
      </main>
    </div>
  );
}

export default MyList;
