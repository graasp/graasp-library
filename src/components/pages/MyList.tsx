'use client';

import { useContext } from 'react';

import { Box, Container, Skeleton, Typography } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNAUTHORIZED_CODE } from '../../config/messages';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import MainWrapper from '../layout/MainWrapper';
import MyLikes from './MyLikes';

const MyList = (): JSX.Element | null => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);

  const { data: member, isLoading } = hooks.useCurrentMember();

  if (member && member.id) {
    return (
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Typography variant="h5">{t(LIBRARY.LIKED_ITEMS)}</Typography>
        <Box sx={{ mt: 4 }}>
          <MyLikes />
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return <Skeleton />;
  }

  // todo: currently member response is not empty when member is logged out, so we default to unauthorized
  return (
    <Box p={5}>
      <Error code={ERROR_UNAUTHORIZED_CODE} />
    </Box>
  );
};

const MyListWrapper = () => (
  <MainWrapper>
    <MyList />
  </MainWrapper>
);

export default MyListWrapper;
