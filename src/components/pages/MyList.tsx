import dynamic from 'next/dynamic';

import React, { useState } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AppBar, Box, Tab, Tabs } from '@mui/material';

import { Context } from '@graasp/sdk';

import { APP_AUTHOR, MY_LIST_TAB_NAMES } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { buildMyListNavigationTabId } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import MyFavorites from './MyFavorites';
import MyLikes from './MyLikes';
import MyPublishedCollections from './MyPublishedCollections';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const MyList = () => {
  const { t } = useLibraryTranslation();
  const { leftContent, rightContent } = useHeader();

  const [tab, setTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <Seo
        title={t(LIBRARY.GRAASP_LIBRARY)}
        description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
        author={APP_AUTHOR}
      />
      <Main
        context={Context.Library}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <AppBar position="static" color="default" sx={{ boxShadow: 0 }}>
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
        <Box display="flex" flexGrow={1}>
          <MyFavorites tab={tab} index={0} />
          <MyLikes tab={tab} index={1} />
          <MyPublishedCollections tab={tab} index={2} />
        </Box>
      </Main>
    </>
  );
};

export default MyList;
