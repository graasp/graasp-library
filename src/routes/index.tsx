import { Box } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { DiscoverButton } from '~/components/common/DiscoverButton';
import { FeaturedCollections } from '~/components/home/FeaturedCollections';
import { KPI } from '~/components/home/KPI';
import { PopularDisciplines } from '~/components/home/PopularDisciplines';
import { RecentPublished } from '~/components/home/RecentPublished';
import { HomeHeader } from '~/components/layout/HomeHeader';
import StyledBackgroundContainer from '~/components/layout/StyledBackgroundContainer';
import { m } from '~/paraglide/messages';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: m.GRAASP_LIBRARY(),
        description: m.GRAASP_LIBRARY_DESCRIPTION(),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <StyledBackgroundContainer>
      <HomeHeader />

      <FeaturedCollections />
      {/* <HighlightCollectionSection
        id={MOST_LIKED_TITLE_ID}
        title={m.HOME_MOST_LIKED_COLLECTIONS_TITLE()}
      >
        <LikedCollections />
      </HighlightCollectionSection> */}

      <KPI />
      <PopularDisciplines />

      <RecentPublished />

      <Box textAlign="center" py={20}>
        <DiscoverButton message={m.HOME_VIEW_MORE_IN_LIBRARY_BUTTON()} />
      </Box>
    </StyledBackgroundContainer>
  );
}

// function LikedCollections() {
//   const { data } = useSuspenseQuery(
//     getMostLikedCollectionsOptions({
//       query: { limit: HOMEPAGE_NB_ELEMENTS_TO_SHOW },
//     }),
//   );
//   return data.hits.map((collection) => (
//     <CollectionItem key={collection.id} collection={collection} />
//   ));
// }
