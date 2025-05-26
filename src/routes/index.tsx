import { Box } from '@mui/material';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { HighlightCollectionSection } from '~/components/collection/HighlightCollectionSection';
import { DiscoverButton } from '~/components/common/DiscoverButton';
import { HomeHeader } from '~/components/layout/HomeHeader';
import StyledBackgroundContainer from '~/components/layout/StyledBackgroundContainer';
import { CollectionItem } from '~/components/ui/CollectionItem';
import { HOMEPAGE_NB_ELEMENTS_TO_SHOW } from '~/config/constants';
import {
  GRAASPER_COLLECTIONS_GRID_ID,
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
} from '~/config/selectors';
import {
  getFeaturedCollectionsOptions,
  getMostLikedCollectionsOptions,
  getMostRecentCollectionsOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: m.GRAASP_LIBRARY(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <StyledBackgroundContainer>
      <HomeHeader />

      <HighlightCollectionSection
        id={GRAASP_SELECTION_TITLE_ID}
        collectionGridId={GRAASPER_COLLECTIONS_GRID_ID}
        title={m.HOME_GRAASPER_COLLECTIONS_TITLE()}
      >
        <GraasperCollections />
      </HighlightCollectionSection>
      <HighlightCollectionSection
        id={MOST_LIKED_TITLE_ID}
        title={m.HOME_MOST_LIKED_COLLECTIONS_TITLE()}
      >
        <LikedCollections />
      </HighlightCollectionSection>
      <HighlightCollectionSection
        id={RECENT_PUBLICATIONS_TITLE_ID}
        title={m.HOME_RECENT_COLLECTIONS_TITLE()}
      >
        <RecentCollections />
      </HighlightCollectionSection>

      <Box textAlign="center" py={20}>
        <DiscoverButton message={m.HOME_VIEW_MORE_IN_LIBRARY_BUTTON()} />
      </Box>
    </StyledBackgroundContainer>
  );
}

function GraasperCollections() {
  const { data } = useSuspenseQuery(
    getFeaturedCollectionsOptions({
      query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
    }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}

function LikedCollections() {
  const { data } = useSuspenseQuery(
    getMostLikedCollectionsOptions({
      query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
    }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}

function RecentCollections() {
  const { data } = useSuspenseQuery(
    getMostRecentCollectionsOptions({
      query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
    }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}
