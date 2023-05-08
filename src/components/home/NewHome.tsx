// import { useTranslation } from 'react-i18next';
// import { LIBRARY } from '@graasp/translations';
import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { Explore } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { Context } from '@graasp/sdk';

import { APP_AUTHOR } from '../../config/constants';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
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

const DiscoverButton = styled(Button)(() => ({
  color: GRAASP_COLOR,
  fontSize: '1.2rem',
  padding: '20px 50px',
}));

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  // const { t } = useTranslation();

  const { leftContent, rightContent } = useHeader();

  const { hooks } = useContext(QueryClientContext);

  const { data: collections } = hooks.usePublicItemsWithTag(PUBLISHED_TAG_ID, {
    placeholderData: PLACEHOLDER_COLLECTIONS,
  });

  return (
    <div style={{ backgroundColor: GRAASP_COLOR }}>
      <Seo
        title={/* t(LIBRARY.GRAASP_LIBRARY) */ 'title'}
        description={/* t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION) */ 'description'}
        author={APP_AUTHOR}
      />
      <Main
        context={Context.LIBRARY}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Header />

        <ItemCollection
          collections={collections}
          title="Popular this week"
          sx={{ backgroundColor: 'white' }}
        />
        <ItemCollection
          collections={collections}
          title="Graasp Selection"
          sx={{ backgroundColor: '#fafafa' }}
        />
        <ItemCollection
          collections={collections}
          title="Most liked"
          sx={{ backgroundColor: 'white' }}
        />

        <Box textAlign="center" marginBottom={20} marginTop={20}>
          <DiscoverButton
            startIcon={<Explore fontSize="large" />}
            color="secondary"
            variant="contained"
            size="large"
          >
            View more in the library
          </DiscoverButton>
        </Box>
      </Main>
    </div>
  );
};
export default Home;
