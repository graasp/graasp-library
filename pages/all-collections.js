import getConfig from 'next/config';
import PropTypes from 'prop-types';

import * as React from 'react';

import { Box } from '@mui/material';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import AllCollections from '../src/components/home/AllCollections';
import { PUBLISHED_ITEMS_KEY } from '../src/config/constants';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

const AllCollectionsPage = ({ dehydratedState }) => (
  <Box style={{ backgroundColor: '#F8F7FE' }}>
    <Wrapper dehydratedState={dehydratedState}>
      <AllCollections />
    </Wrapper>
  </Box>
);

AllCollectionsPage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(PUBLISHED_ITEMS_KEY, () =>
    Api.getPublicItemsWithTag(
      {
        tagId: publicRuntimeConfig.NEXT_PUBLIC_PUBLISHED_TAG_ID,
      },
      QUERY_CLIENT_OPTIONS,
    ).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default AllCollectionsPage;
