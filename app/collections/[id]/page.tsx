// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import ReactGA from 'react-ga4';
// import { hasAcceptedCookies } from '@graasp/sdk';
// import { ENV, UrlSearch } from '../src/config/constants';
// import createEmotionCache from '../src/config/createEmotionCache';
// import { GA_MEASUREMENT_ID, NODE_ENV } from '../src/config/env';
// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();
// import { Api, DATA_KEYS, configureQueryClient } from '@graasp/query-client';
import Head from 'next/head';

import { dehydrate } from 'react-query/core';

import Hydrate from '../../../src/components/HydrateClient';
import Collection from '../../../src/components/collection/Collection';
import Wrapper from '../../../src/components/common/Wrapper';
import { APP_AUTHOR } from '../../../src/config/constants';
import getQueryClient from '../../../src/config/get-query-client';
import LIBRARY from '../../../src/langs/constants';
import en from '../../../src/langs/en.json';
import { buildSeo } from '../../seo';

export async function generateMetadata() {
  // TODO: get id from params

  // const name = collection?.name || '';
  // const parsedDescription = collection?.description || '';
  // const author = collection?.creator?.name || '';
  // // todo: handle image
  // const imageUrl = DEFAULT_ITEM_IMAGE_PATH;

  // todo: get lang from location and crawler
  // question: how to get language from
  // @ts-ignore
  const t = (s: string): string => en[s];

  return buildSeo({
    title: t(LIBRARY.GRAASP_LIBRARY),
    description: t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION),
    author: APP_AUTHOR, // todo: use item creator?
  });
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  //   if (id) {
  //     // prefetch data in query client

  //   await queryClient.prefetchQuery(DATA_KEYS.buildItemKey(id), () =>
  //   Api.getItem(id, { ...QUERY_CLIENT_OPTIONS, axios }),
  // );
  //   }

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
          <Collection id={id} />
        </Wrapper>
      </Hydrate>
    </>
  );
};
export default Page;
