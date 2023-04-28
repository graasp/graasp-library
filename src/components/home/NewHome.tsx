import React, { useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import { LIBRARY } from '@graasp/translations';
import dynamic from 'next/dynamic';
import { Context } from '@graasp/sdk';
import { Explore } from '@mui/icons-material';

import { Button, Container } from '@mui/material';
import Seo from '../common/Seo';
import { APP_AUTHOR } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import useHeader from '../layout/useHeader';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import Header from './Header';
import ItemCollection from './ItemCollection';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

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
      <div style={{ backgroundColor: '#504FD2' }}>
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

          <Container maxWidth='lg'>
            <Button
              startIcon={<Explore />}
              color='secondary'
              variant='contained'
              size="large"
            >
              View more in the library
            </Button>
          </Container>
        </Main>
      </div>
    </>
  );
};
export default Home;
