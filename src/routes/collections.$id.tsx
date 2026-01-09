import { Alert, AlertTitle, Stack } from '@mui/material';

import { ActionTriggers } from '@graasp/sdk';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ErrorComponentProps,
  createFileRoute,
  notFound,
} from '@tanstack/react-router';

import { CustomLink } from '~/components/CustomLink';
import { Collection } from '~/components/collection/Collection';
import { postAction } from '~/openapi/client';
import {
  getChildrenOptions,
  getCollectionInformationsOptions,
  getItemOptions,
  getTagsForItemOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/collections/$id')({
  beforeLoad: async ({ context, params }) => {
    const published_item = await context.queryClient.ensureQueryData(
      getCollectionInformationsOptions({ path: { itemId: params.id } }),
    );
    if (!published_item) {
      throw notFound();
    }
  },
  loader: async ({ context, params, preload }) => {
    // start loading children
    context.queryClient.prefetchQuery(
      getChildrenOptions({ path: { id: params.id } }),
    );
    const collection = await context.queryClient.ensureQueryData(
      getItemOptions({ path: { id: params.id } }),
    );
    const tags = await context.queryClient.ensureQueryData(
      getTagsForItemOptions({ path: { itemId: params.id } }),
    );

    if (!preload) {
      try {
        // post view action
        await postAction({
          path: { id: params.id },
          body: { type: ActionTriggers.CollectionView },
        });
      } catch {
        // eslint-disable-next-line no-console
        console.log("couldn't post a view");
      }
    }
    return {
      collection,
      keywords: tags.map((t) => t.name).join(','),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          ...seo({
            title: loaderData.collection.name,
            description: loaderData.collection.description ?? '', // FIXME: description should probably be returned as a raw string without HTML formatting
            image: loaderData.collection.thumbnails?.medium, // FIXME: Ensure the url provided will be valid for longer than 1hour
            keywords: loaderData.keywords, // fetch the tags for the collection
          }),
        ]
      : undefined,
  }),
  component: CollectionView,
  notFoundComponent: CollectionNotFound,
  errorComponent: CollectionError,
});

function CollectionNotFound() {
  return (
    <Alert>
      <AlertTitle>{m.COLLECTION_NOT_FOUND()}</AlertTitle>
    </Alert>
  );
}

function CollectionError({ error }: ErrorComponentProps) {
  return (
    <Stack width="100%" height="100%">
      <Alert severity="error">
        <AlertTitle>{m.COLLECTION_ERROR_TITLE()}</AlertTitle>
        {error.message}
        <br />
        <CustomLink to="/search">{m.HOME_BROWSE_ALL_COLLECTIONS()}</CustomLink>
      </Alert>
    </Stack>
  );
}

function CollectionView() {
  const { id } = Route.useParams();

  const { data: collection } = useSuspenseQuery(
    getItemOptions({ path: { id } }),
  );

  return <Collection collection={collection} />;
}
