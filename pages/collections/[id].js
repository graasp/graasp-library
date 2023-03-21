import PropTypes from 'prop-types';

import * as React from 'react';

import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';

import Collection from '../../src/components/collection/Collection';
import Wrapper from '../../src/components/common/Wrapper';
import { QUERY_CLIENT_OPTIONS } from '../../src/config/queryClient';

const CollectionPage = ({ dehydratedState, id }) => (
  <Wrapper dehydratedState={dehydratedState}>
    <Collection id={id} />
  </Wrapper>
);

CollectionPage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
};

// This gets called on every request
export async function getServerSideProps({ params }) {
  const { id } = params;
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  // prefetch data in query client
  await queryClient.prefetchQuery(DATA_KEYS.buildItemKey(id), () =>
    Api.getItem(id, QUERY_CLIENT_OPTIONS).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { id, dehydratedState: dehydrate(queryClient) } };
}

export default CollectionPage;
