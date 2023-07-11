import { DehydratedState } from 'react-query';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import Home from '../src/components/pages/Home';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';

const HomePage = ({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) => (
  <Wrapper dehydratedState={dehydratedState}>
    <Home />
  </Wrapper>
);

export async function getServerSideProps() {
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  // todo: can't use DATA_KEYS.buildPublishedItemsKey which returns undefined when no categoryIds are passed in
  await queryClient.prefetchQuery(['items', 'collections', 'all'], () =>
    Api.getAllPublishedItems({}, QUERY_CLIENT_OPTIONS).then((data) => {
      // todo: this is a hack to resolve the date serializing issue
      // deserialization of dates should happen later in the pipeline so we ge the raw api response here
      return JSON.parse(JSON.stringify(data));
    }),
  );
  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default HomePage;
