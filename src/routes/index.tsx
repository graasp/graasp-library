import { Box, Container, Stack } from '@mui/material';

import { ClientOnly, createFileRoute } from '@tanstack/react-router';

import { FeaturedCollections } from '~/components/home/FeaturedCollections';
import { HomeFooter } from '~/components/home/HomeFooter';
import { Kpi } from '~/components/home/Kpi';
import { LikedCollections } from '~/components/home/LikedCollections';
import { PopularDisciplines } from '~/components/home/PopularDisciplines';
import { RecentPublished } from '~/components/home/RecentPublished';
import { HomeHeader } from '~/components/layout/HomeHeader';
import StyledBackgroundContainer from '~/components/layout/StyledBackgroundContainer';
import StyledContainer from '~/components/layout/StyledContainer';
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
    <Stack>
      <StyledBackgroundContainer py={5}>
        <HomeHeader />
      </StyledBackgroundContainer>

      <StyledContainer>
        <Container>
          <FeaturedCollections />
        </Container>
      </StyledContainer>

      <StyledContainer sx={{ py: 5 }}>
        <Container>
          <ClientOnly>
            <Kpi />
          </ClientOnly>
        </Container>
      </StyledContainer>

      <StyledBackgroundContainer sx={{ py: 5 }}>
        <Container>
          <PopularDisciplines />
        </Container>
      </StyledBackgroundContainer>

      <StyledContainer>
        <Container>
          <LikedCollections />
        </Container>
      </StyledContainer>

      <StyledContainer>
        <Container>
          <RecentPublished />
        </Container>
      </StyledContainer>

      <StyledBackgroundContainer>
        <Box textAlign="center" py={20}>
          <HomeFooter />
        </Box>
      </StyledBackgroundContainer>
    </Stack>
  );
}
