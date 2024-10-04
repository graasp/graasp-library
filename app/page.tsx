import { dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { configureQueryClient } from '@graasp/query-client';

import Hydrate from '../src/components/HydrateClient';
import Wrapper from '../src/components/common/Wrapper';
import Home from '../src/components/pages/Home';
import { HOMEPAGE_NB_ELEMENTS_TO_SHOW } from '../src/config/constants';
import { GRAASPER_ID, GRAASP_API_HOST } from '../src/config/env';
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
  const { hooks } = configureQueryClient({
    API_HOST: GRAASP_API_HOST,
  });
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      hooks.publishedItemsForMemberOptions(GRAASPER_ID),
    ),

    queryClient.prefetchQuery(
      hooks.mostLikedPublishedItemsOptions({
        limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
      }),
    ),

    // TODO: Error: Hydration failed because the initial UI does not match what was rendered on the server.
    // queryClient.prefetchQuery(
    //   hooks.mostRecentPublishedItemsOptions({
    //     limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW,
    //   }),
    // ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Wrapper dehydratedState={dehydratedState}>
        <Home />
      </Wrapper>
    </Hydrate>
  );
};
export default Page;
