import { dehydrate } from '@tanstack/react-query';

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
    <Hydrate state={dehydratedState}>
      <Wrapper dehydratedState={dehydratedState} bgcolor="white">
        <Collection id={id} />
      </Wrapper>
    </Hydrate>
  );
};
export default Page;
