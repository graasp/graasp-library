import { DehydratedState } from 'react-query';

import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import MyList from '../src/components/home/MyList';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

const MyListPage = ({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) => (
  <Wrapper dehydratedState={dehydratedState}>
    <MyList />
  </Wrapper>
);

export async function getServerSideProps() {
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(DATA_KEYS.buildPublishedItemsKey(), () =>
    Api.getAllPublishedItems({}, QUERY_CLIENT_OPTIONS).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default MyListPage;
