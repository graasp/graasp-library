import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Explore } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import {
  APP_AUTHOR,
  GRAASP_COLOR,
  HOMEPAGE_NB_ELEMENTS_TO_SHOW,
} from '../../config/constants';
import { NEXT_PUBLIC_GRAASPER_ID } from '../../config/env';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  POPULAR_THIS_WEEK_TITLE_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import ItemCollection from '../collection/ItemCollection';
import Seo from '../common/Seo';
import HomeHeader from '../layout/HomeHeader';
import useHeader from '../layout/useHeader';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const StyledBackgroundContainer = styled(Box)(() => ({
  backgroundColor: 'hsl(240, 68%, 43%)',
}));

const DiscoverButton = styled(Button)(({ theme }) => ({
  color: GRAASP_COLOR,
  fontSize: '1.2rem',
  padding: theme.spacing(3, 6),
  textTransform: 'none',
}));

const Home = () => {
  const { t } = useTranslation();

  const { leftContent, rightContent } = useHeader();
  const { hooks } = useContext(QueryClientContext);

  const { data: graasperCollections } = hooks.usePublishedItemsForMember(
    NEXT_PUBLIC_GRAASPER_ID,
  );
  const { data: mostLikedCollections } = hooks.useMostLikedPublishedItems({
    limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
  });
  const { data: recentCollections } = hooks.useMostRecentPublishedItems({
    limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
  });

  return (
    <StyledBackgroundContainer>
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
        <HomeHeader />

        <ItemCollection
          id={GRAASP_SELECTION_TITLE_ID}
          collectionGridId={GRAASPER_COLLECTIONS_GRID_ID}
          collections={graasperCollections}
          title={t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          id={MOST_LIKED_TITLE_ID}
          collections={mostLikedCollections}
          title={t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
        />
        <ItemCollection
          id={POPULAR_THIS_WEEK_TITLE_ID}
          collections={recentCollections}
          title={t(LIBRARY.HOME_RECENT_COLLECTIONS_TITLE)}
        />

        <Box textAlign="center" marginBottom={20} marginTop={20}>
          <DiscoverButton
            LinkComponent={Link}
            href={ALL_COLLECTIONS_ROUTE}
            startIcon={<Explore fontSize="large" />}
            color="secondary"
            variant="contained"
            size="large"
          >
            {t(LIBRARY.HOME_VIEW_MORE_IN_LIBRARY_BUTTON)}
          </DiscoverButton>
        </Box>
      </Main>
    </StyledBackgroundContainer>
  );
};
export default Home;
