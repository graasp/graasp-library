import React, { useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import { LIBRARY } from '@graasp/translations';
import dynamic from 'next/dynamic';
import { Context } from '@graasp/sdk';
import { Explore } from '@mui/icons-material';

import { Box, Button, styled } from '@mui/material';
import Seo from '../common/Seo';
import { APP_AUTHOR } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import useHeader from '../layout/useHeader';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
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

type HomeProps = {

};

const Home: React.FC<HomeProps> = () => {
  // const { t } = useTranslation();

  const { leftContent, rightContent } = useHeader();

  const { hooks } = useContext(QueryClientContext);

  const { data: collections } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );

  return (
    <>
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

          <ItemCollection collections={collections} title='Popular this week' />
          <ItemCollection collections={collections} title='Graasp Selection' />
          <ItemCollection collections={collections} title='Most liked' />

          <Box textAlign='center' marginBottom={20} marginTop={20}>
            <DiscoverButton
              startIcon={<Explore fontSize='large' />}
              color='secondary'
              variant='contained'
              size="large"
            >
              View more in the library
            </DiscoverButton>
          </Box>
        </Main>
      </div>
    </>
  );
};
export default Home;
