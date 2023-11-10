import { Metadata } from 'next';
import Head from 'next/head';

import { dehydrate } from 'react-query/core';

import Hydrate from '../src/components/HydrateClient';
import Wrapper from '../src/components/common/Wrapper';
import Home from '../src/components/pages/Home';
import getQueryClient from '../src/config/get-query-client';
import LIBRARY from '../src/langs/constants';
import en from '../src/langs/en.json';
import { buildSeo } from './seo';

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
export async function generateMetadata(): Promise<Metadata> {
  // todo: get lang from location and crawler
  // question: how to get language from
  // @ts-ignore
  const t = (s: string): string => en[s];

  // TODO: add url
  return buildSeo({
    title: t(LIBRARY.GRAASP_LIBRARY),
    description: t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION),
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
          <Home />
        </Wrapper>
      </Hydrate>
    </>
  );
};
export default Page;
