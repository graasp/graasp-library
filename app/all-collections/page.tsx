import { Suspense } from 'react';

import { dehydrate } from '@tanstack/react-query';

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
  // eslint-disable-next-line
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
    <Hydrate state={dehydratedState}>
      <Suspense>
        <Wrapper dehydratedState={dehydratedState}>
          <AllCollections />
        </Wrapper>
      </Suspense>
    </Hydrate>
  );
};
export default Page;
