'use client';

import { Box } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

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
import {
  collectionSearchOptions,
  getMostLikedCollectionsOptions,
  getMostRecentCollectionsOptions,
} from '../../openapi/client/@tanstack/react-query.gen';
import ItemCollection from '../collection/ItemCollection';
import DiscoverButton from '../common/DiscoverButton';
import HomeHeader from '../layout/HomeHeader';
import MainWrapper from '../layout/MainWrapper';
import StyledBackgroundContainer from '../layout/StyledBackgroundContainer';

const Home = () => {
  const { t } = useLibraryTranslation();
  const { data: graasperCollections, isPending: isGraasperCollectionsPending } =
    useQuery(
      collectionSearchOptions({
        body: { creatorId: GRAASPER_ID },
      }),
    );
  const {
    data: mostLikedCollections,
    isPending: isMostLikedCollectionsPending,
  } = useQuery(
    getMostLikedCollectionsOptions({
      query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
    }),
  );
  const { data: recentCollections, isPending: isMostRecentPending } = useQuery(
    getMostRecentCollectionsOptions({
      query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
    }),
  );

  return (
    <MainWrapper>
      <StyledBackgroundContainer>
        <HomeHeader />

        <ItemCollection
          isLoading={isGraasperCollectionsPending}
          id={GRAASP_SELECTION_TITLE_ID}
          collectionGridId={GRAASPER_COLLECTIONS_GRID_ID}
          collections={graasperCollections?.hits}
          title={t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          isLoading={isMostLikedCollectionsPending}
          id={MOST_LIKED_TITLE_ID}
          collections={mostLikedCollections?.hits}
          title={t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          isLoading={isMostRecentPending}
          id={RECENT_PUBLICATIONS_TITLE_ID}
          collections={recentCollections?.hits}
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
