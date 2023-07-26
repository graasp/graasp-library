import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Explore } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR, GRAASP_COLOR } from '../../config/constants';
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

const PATTERN_OPACITY = 0.7;
const SECONDARY_PATTERN_COLOR = '505DD2';

const StyledBackgroundContainer = styled(Box)(() => ({
  backgroundColor: GRAASP_COLOR,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23${SECONDARY_PATTERN_COLOR}' fill-opacity='${PATTERN_OPACITY}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
  const { data: mostLikedCollections } = hooks.useMostLikedPublishedItems();
  const { data: recentCollections } = hooks.useMostRecentPublishedItems();

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
          title={t(LIBRARY.HOME_POPULAR_THIS_WEEK_COLLECTIONS_TITLE)}
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
