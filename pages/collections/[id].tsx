import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

import * as React from 'react';
import type { DehydratedState } from 'react-query';

import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';

import Collection from '../../src/components/collection/Collection';
import Wrapper from '../../src/components/common/Wrapper';
import { QUERY_CLIENT_OPTIONS } from '../../src/config/queryClient';

const CollectionPage = ({
  dehydratedState,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Wrapper dehydratedState={dehydratedState}>
    <Collection id={id} />
  </Wrapper>
);

type Props = {
  dehydratedState: DehydratedState;
  id?: string;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id;
  const { queryClient, dehydrate, axios } =
    configureQueryClient(QUERY_CLIENT_OPTIONS);
  if (id) {
    // prefetch data in query client
    await queryClient.prefetchQuery(DATA_KEYS.buildItemKey(id), () =>
      Api.getItem(id, { ...QUERY_CLIENT_OPTIONS, axios }),
    );
  }
  // TODO: Prefetch items for breadcrumb.
  // const parents = path.replaceAll('_', '-').split('.');
  // await queryClient.prefetchQuery(DATA_KEYS.buildItemsKey(parents), () => {
  //   Api.getItems(parents).then(data => data).catch(() => ({}))
  // });

  // Pass data to the page via props
  return { props: { id, dehydratedState: dehydrate(queryClient) } };
};

export default CollectionPage;
