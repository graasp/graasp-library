'use client';

import { useContext } from 'react';

import { Box } from '@mui/material';

import { HOMEPAGE_NB_ELEMENTS_TO_SHOW } from '../../config/constants';
import { GRAASPER_ID } from '../../config/env';
import { useLibraryTranslation } from '../../config/i18n';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ItemCollection from '../collection/ItemCollection';
import DiscoverButton from '../common/DiscoverButton';
import HomeHeader from '../layout/HomeHeader';
import MainWrapper from '../layout/MainWrapper';
import StyledBackgroundContainer from '../layout/StyledBackgroundContainer';

const Home = () => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);

  const { data: graasperCollections, isLoading: isGraasperCollectionsLoading } =
    hooks.usePublishedItemsForMember(GRAASPER_ID);
  const {
    data: mostLikedCollections,
    isLoading: isMostLikedCollectionsLoading,
  } = hooks.useMostLikedPublishedItems({
    limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
  });
  const { data: recentCollections, isLoading: isMostRecentLoading } =
    hooks.useMostRecentPublishedItems({
      limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
    });

  return (
    <MainWrapper>
      <StyledBackgroundContainer>
        <HomeHeader />

        <ItemCollection
          isLoading={isGraasperCollectionsLoading}
          id={GRAASP_SELECTION_TITLE_ID}
          collectionGridId={GRAASPER_COLLECTIONS_GRID_ID}
          collections={graasperCollections}
          title={t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          isLoading={isMostLikedCollectionsLoading}
          id={MOST_LIKED_TITLE_ID}
          collections={mostLikedCollections}
          title={t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          isLoading={isMostRecentLoading}
          id={RECENT_PUBLICATIONS_TITLE_ID}
          collections={recentCollections}
          title={t(LIBRARY.HOME_RECENT_COLLECTIONS_TITLE)}
        />

        <Box textAlign="center" py={20}>
          <DiscoverButton
            message={t(LIBRARY.HOME_VIEW_MORE_IN_LIBRARY_BUTTON)}
          />
        </Box>
      </StyledBackgroundContainer>
    </MainWrapper>
  );
};
export default Home;
