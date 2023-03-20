import getConfig from 'next/config';
import PropTypes from 'prop-types';

import * as React from 'react';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import Home from '../src/components/home/Home';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

function HomePage({ dehydratedState }) {
  return (
    <Wrapper dehydratedState={dehydratedState}>
      <Home />
    </Wrapper>
  );
}

HomePage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(DATA_KEYS.buildPublishedItemsKey(), () =>
    Api.getAllPublishedItems(args, QUERY_CLIENT_OPTIONS).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default HomePage;
