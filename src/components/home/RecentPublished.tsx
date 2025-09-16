import { Button, Container, Stack, Typography } from '@mui/material';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CollectionItem } from '~/components/ui/CollectionItem';
import { getMostRecentCollectionsOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import {
  RECENT_PUBLICATIONS_TITLE_ID,
  SECTION_TITLE_ID,
} from '../../config/selectors';
import { BigCardGrid } from '../common/Card/BigCard';
import StyledContainer from '../layout/StyledContainer';

export function RecentPublished() {
  return (
    <StyledContainer id={RECENT_PUBLICATIONS_TITLE_ID}>
      <Container>
        <Stack gap={5}>
          <Stack>
            <Typography variant="h4" id={SECTION_TITLE_ID}>
              {m.HOME_RECENT_COLLECTIONS_TITLE()}
            </Typography>
            <Typography variant="subtitle1">
              Latest collections published and share by the community
            </Typography>
          </Stack>

          <BigCardGrid>
            <RecentCollections />
          </BigCardGrid>
          <Stack direction="row" justifyContent="center">
            <Button fullWidth={false} variant="contained">
              View all collections
            </Button>
          </Stack>
        </Stack>
      </Container>
    </StyledContainer>
  );
}

function RecentCollections() {
  const { data } = useSuspenseQuery(
    getMostRecentCollectionsOptions({
      query: { limit: 4 },
    }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}
