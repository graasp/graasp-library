import getConfig from 'next/config';

import * as React from 'react';
import { DehydratedState } from 'react-query';

import { Api, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../src/components/common/Wrapper';
import Home from '../src/components/home/NewHome';
import { QUERY_CLIENT_OPTIONS } from '../src/config/queryClient';
import { PUBLISHED_ITEMS_KEY } from '../src/config/queryKeys';

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

export default HomePage;
