import PropTypes from 'prop-types';

import { DehydratedState } from 'react-query';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import AllCollections from '../src/components/pages/AllCollections';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

const AllCollectionsPage = ({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) => (
  <Wrapper
    dehydratedState={dehydratedState}
    sx={{ backgroundColor: '#F8F7FE' }}
  >
    <AllCollections />
  </Wrapper>
);

AllCollectionsPage.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

export async function getServerSideProps() {
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(['items', 'collections', 'all'], () =>
    Api.getAllPublishedItems({}, QUERY_CLIENT_OPTIONS).then((data) =>
      JSON.parse(JSON.stringify(data)),
    ),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default AllCollectionsPage;
