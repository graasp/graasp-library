import { configureQueryClient, Api, DATA_KEYS } from '@graasp/query-client';
import PropTypes from 'prop-types';

import * as React from 'react';
import { buildCollectionKey } from '../../src/config/constants';
import { QUERY_CLIENT_OPTIONS } from '../../src/config/queryClient';
import Collection from '../../src/components/collection/Collection';
import Wrapper from '../../src/components/common/Wrapper';

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
  const collectionKey = buildCollectionKey(id);
  await queryClient.prefetchQuery(collectionKey, () =>
    Api.getItem(id, QUERY_CLIENT_OPTIONS).then((data) => data),
  );
  
  const queryData = await queryClient.getQueryData(collectionKey);

  const creator = queryData?.creator;
  const path = queryData?.path;

  if (creator) {
    await queryClient.prefetchQuery(DATA_KEYS.buildMemberKey(creator), () =>
      Api.getMember(
        {
          id: creator,
        },
        QUERY_CLIENT_OPTIONS,
      )
        .then((data) => data)
        .catch(
          () => ({}), // do not fail on fetch error, set empty member
        ),
    );
  }

  await queryClient.prefetchQuery(DATA_KEYS.buildItemParentsKey(id),  () => 
    Api.getParents({ path }).then((data) => data));

  // Pass data to the page via props
  return { props: { id, dehydratedState: dehydrate(queryClient) } };
}

export default CollectionPage;
