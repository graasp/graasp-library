import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

import * as React from 'react';
import { DehydratedState } from 'react-query';

import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';

import Wrapper from '../../src/components/common/Wrapper';
import Member from '../../src/components/pages/Member';
import { QUERY_CLIENT_OPTIONS } from '../../src/config/queryClient';

const MemberPage = ({
  dehydratedState,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Wrapper dehydratedState={dehydratedState}>
      <Member id={id} />
    </Wrapper>
  );
};

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
      Promise.all([
        Api.getMember({ id }, { ...QUERY_CLIENT_OPTIONS, axios }).then(
          (data) => {
            return JSON.parse(JSON.stringify(data));
          },
        ),
        Api.getPublishedItemsForMember(id, {
          ...QUERY_CLIENT_OPTIONS,
          axios,
        }).then((data) => {
          return JSON.parse(JSON.stringify(data));
        }),
      ]),
    );
  }

  // Pass data to the page via props
  return { props: { id, dehydratedState: dehydrate(queryClient) } };
};

export default MemberPage;
