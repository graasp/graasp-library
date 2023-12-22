import Head from 'next/head';

import { dehydrate } from 'react-query/core';

import Hydrate from '../../src/components/HydrateClient';
import Wrapper from '../../src/components/common/Wrapper';
import AllCollections from '../../src/components/pages/AllCollections';
import { APP_AUTHOR } from '../../src/config/constants';
import getQueryClient from '../../src/config/get-query-client';
import LIBRARY from '../../src/langs/constants';
import en from '../../src/langs/en.json';
import { buildSeo } from '../seo';

export async function generateMetadata() {
  // todo: get lang from location and crawler
  // question: how to get language from
  // @ts-ignore
  const t = (s: string): string => en[s];

  return buildSeo({
    title: t(LIBRARY.GRAASP_LIBRARY),
    description: t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION),
    author: APP_AUTHOR,
  });
}

const Page = async () => {
  const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(['items', 'collections', 'all'], () =>
  //   Api.getAllPublishedItems({}, { API_HOST: GRAASP_API_HOST, axios }),
  // );
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Head>
        <title>Graasp Library</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Hydrate state={dehydratedState}>
        <Wrapper dehydratedState={dehydratedState}>
          <AllCollections />
        </Wrapper>
      </Hydrate>
    </>
  );
};
export default Page;
