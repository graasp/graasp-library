'use client';

// ^ the use client directive should be removed as soon as possible once query-client provides a real ESm build
import Link from 'next/link';

import { useContext } from 'react';

import { ArrowForward } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LibraryIcon, Main } from '@graasp/ui';

import {
  GRAASP_COLOR,
  HOMEPAGE_NB_ELEMENTS_TO_SHOW,
} from '../../config/constants';
import { GRAASPER_ID } from '../../config/env';
import { useLibraryTranslation } from '../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  POPULAR_THIS_WEEK_TITLE_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ItemCollection from '../collection/ItemCollection';
import HomeHeader from '../layout/HomeHeader';
import useHeader from '../layout/useHeader';

const PATTERN_OPACITY = 0.7;
const SECONDARY_PATTERN_COLOR = '505DD2';

const StyledBackgroundContainer = styled(Box)(() => ({
  backgroundColor: GRAASP_COLOR,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23${SECONDARY_PATTERN_COLOR}' fill-opacity='${PATTERN_OPACITY}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
}));

const DiscoverButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 6),
  },
  backgroundColor: 'transparent',
  textTransform: 'none',
  ':hover': {
    transition: 'background-color 500ms linear',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  '&:hover > .MuiButton-endIcon': {
    '@keyframes bounce': {
      '0%': { transform: 'translateX(0px)' },
      '30%': { transform: 'translateX(15px)' },
      '85%': { transform: 'translateX(0px)' },
    },
    animationName: 'bounce',
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
  },
}));

const Home = () => {
  const { t } = useLibraryTranslation();

  const { leftContent, rightContent } = useHeader();
  const { hooks } = useContext(QueryClientContext);

  const { data: graasperCollections } =
    hooks.usePublishedItemsForMember(GRAASPER_ID);
  const { data: mostLikedCollections } = hooks.useMostLikedPublishedItems({
    limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
  });
  const { data: recentCollections } = hooks.useMostRecentPublishedItems({
    limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
  });

  return (
    <StyledBackgroundContainer>
      <Main
        open={false}
        context={Context.Library}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
        drawerContent={<>Drawer</>}
        drawerOpenAriaLabel="open drawer"
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
            endIcon={<ArrowForward />}
            color="secondary"
          >
            <Box display="inline">
              <LibraryIcon
                size={30}
                sx={{ mr: 1, verticalAlign: 'middle', mt: '-3px' }}
                secondaryColor="white"
                primaryColor="transparent"
              />
              {t(LIBRARY.HOME_VIEW_MORE_IN_LIBRARY_BUTTON)}
            </Box>
          </DiscoverButton>
        </Box>
      </Main>
    </StyledBackgroundContainer>
  );
};
export default Home;
