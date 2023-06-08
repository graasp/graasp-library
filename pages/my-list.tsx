import getConfig from 'next/config';

import { DehydratedState } from 'react-query';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import MyList from '../src/components/home/MyList';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';
import { PUBLISHED_ITEMS_KEY } from '../src/config/queryKeys';

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

export default MyListPage;
