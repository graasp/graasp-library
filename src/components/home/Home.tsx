import dynamic from 'next/dynamic';
import Link from 'next/link';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Explore } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import { NEXT_PUBLIC_GRAASPER_ID } from '../../config/env';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  POPULAR_THIS_WEEK_TITLE_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import Header from './Header';
import ItemCollection from './ItemCollection';

export const GRAASP_COLOR = '#504FD2';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const StyledBackgroundContainer = styled(Box)(() => ({
  backgroundColor: GRAASP_COLOR,
}));

const DiscoverButton = styled(Button)(() => ({
  color: GRAASP_COLOR,
  fontSize: '1.2rem',
  padding: '20px 50px',
}));

const Home = () => {
  const { t } = useTranslation();

  const { leftContent, rightContent } = useHeader();

  const { hooks } = useContext(QueryClientContext);

  // todo: implement endpoints for the sections
  const { data: collections } = hooks.useAllPublishedItems();
  const { data: graasperCollections } = hooks.usePublishedItemsForMember(
    NEXT_PUBLIC_GRAASPER_ID,
  );
  // todo: add hook to query-client
  // const {data: mostLikedCollections }
  // todo: add call for most viewed collections (using actions)

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
        <Header />

        <ItemCollection
          id={POPULAR_THIS_WEEK_TITLE_ID}
          collections={collections}
          title={t(LIBRARY.HOME_POPULAR_THIS_WEEK_COLLECTIONS_TITLE)}
          sx={{ backgroundColor: 'white' }}
        />
        <ItemCollection
          id={GRAASP_SELECTION_TITLE_ID}
          collectionGridId={GRAASPER_COLLECTIONS_GRID_ID}
          collections={graasperCollections}
          title={t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
          sx={{ backgroundColor: '#fafafa' }}
        />
        <ItemCollection
          id={MOST_LIKED_TITLE_ID}
          collections={collections}
          title={t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
          sx={{ backgroundColor: 'white' }}
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
            View more in the library
          </DiscoverButton>
        </Box>
      </Main>
    </StyledBackgroundContainer>
  );
};
export default Home;
