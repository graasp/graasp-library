import { dehydrate } from 'react-query/core';

import Hydrate from '../../../src/components/HydrateClient';
import Wrapper from '../../../src/components/common/Wrapper';
import Member from '../../../src/components/pages/Member';
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

// This gets called on every request
const Page = async ({ params: { id } }: { params: { id: string } }) => {
  // const id = params?.id;
  // const { queryClient, dehydrate, axios } =
  //   configureQueryClient(QUERY_CLIENT_OPTIONS);
  // if (id) {
  //   // prefetch data in query client
  //   await queryClient.prefetchQuery(DATA_KEYS.buildItemKey(id), () =>
  //     Promise.all([
  //       Api.getMember({ id }, { ...QUERY_CLIENT_OPTIONS, axios }).then(
  //         (data) => {
  //           return JSON.parse(JSON.stringify(data));
  //         },
  //       ),
  //       Api.getPublishedItemsForMember(id, {
  //         ...QUERY_CLIENT_OPTIONS,
  //         axios,
  //       }).then((data) => {
  //         return JSON.parse(JSON.stringify(data));
  //       }),
  //     ]),
  //   );
  // }

  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Wrapper dehydratedState={dehydratedState}>
        <Member id={id} />
      </Wrapper>
    </Hydrate>
  );
};

export default Page;
