import { Suspense } from 'react';
import { dehydrate } from 'react-query/core';

import Hydrate from '../../src/components/HydrateClient';
import Wrapper from '../../src/components/common/Wrapper';
import OERInformation from '../../src/components/pages/OERInformation';
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
    title: t(LIBRARY.OER_INFORMATION_PAGE_TITLE),
    description: t(LIBRARY.OER_INFORMATION_PAGE_DESCRIPTION),
    author: APP_AUTHOR,
  });
}

const Page = async () => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Suspense>
        <Wrapper dehydratedState={dehydratedState}>
          <OERInformation />
        </Wrapper>
      </Suspense>
    </Hydrate>
  );
};
export default Page;
