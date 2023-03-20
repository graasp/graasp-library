import PropTypes from 'prop-types';

import * as React from 'react';

import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import AllCollections from '../src/components/home/AllCollections';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

function AllCollectionsPage({ dehydratedState }) {
  return (
    <Wrapper dehydratedState={dehydratedState}>
      <AllCollections />
    </Wrapper>
  );
}

AllCollectionsPage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

export async function getServerSideProps() {
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(DATA_KEYS.buildPublishedItemsKey(), () =>
    Api.getAllPublishedItems({}, QUERY_CLIENT_OPTIONS).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default AllCollectionsPage;
