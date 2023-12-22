'use client';

import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { Box, Container, Skeleton, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';

import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNAUTHORIZED_CODE } from '../../config/messages';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import useHeader from '../layout/useHeader';
import MyLikes from './MyLikes';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const MyList = (): JSX.Element | null => {
  const { t } = useLibraryTranslation();
  const { leftContent, rightContent } = useHeader();
  const { hooks } = useContext(QueryClientContext);

  const { data: member, isLoading } = hooks.useCurrentMember();

  if (member && member.id) {
    return (
      <Main
        context={Context.Library}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Container maxWidth="xl" sx={{ my: 5 }}>
          <Typography variant="h5">{t(LIBRARY.LIKED_ITEMS)}</Typography>
          <Box sx={{ mt: 4 }}>
            <MyLikes />
          </Box>
        </Container>
      </Main>
    );
  }

  if (isLoading) {
    return <Skeleton />;
  }

  // todo: currently member response is not empty when member is logged out, so we default to unauthorized
  return (
    <Main
      context={Context.Library}
      headerLeftContent={leftContent}
      headerRightContent={rightContent}
    >
      <Box p={5}>
        <Error code={ERROR_UNAUTHORIZED_CODE} />
      </Box>
    </Main>
  );
};

export default MyList;
