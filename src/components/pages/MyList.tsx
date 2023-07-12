import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AppBar, Box, Tab, Tabs } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { MY_LIST_TAB_NAMES } from '../../config/constants';
import { buildMyListNavigationTabId } from '../../config/selectors';
import MyFavorites from './MyFavorites';
import MyLikes from './MyLikes';
import MyPublishedCollections from './MyPublishedCollections';

const MyList = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box display="flex" flexGrow={1} mt={10}>
      <AppBar position="static" color="default" sx={{ mb: 5, boxShadow: 0 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
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
      <MyPublishedCollections tab={tab} index={2} />
    </Box>
  );
};

export default MyList;
