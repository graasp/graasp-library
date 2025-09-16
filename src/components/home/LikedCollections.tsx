import { Button, Stack, Typography } from '@mui/material';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CollectionItem } from '~/components/ui/CollectionItem';
import { getMostLikedCollectionsOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import { SECTION_TITLE_ID } from '../../config/selectors';
import { BigCardGrid } from '../common/Card/BigCard';
import { ButtonLink } from '../common/links/ButtonLink';

export function LikedCollections() {
  return (
    <Stack gap={5}>
      <Stack>
        <Typography variant="h3" id={SECTION_TITLE_ID}>
          {m.HOME_MOST_LIKED_COLLECTIONS_TITLE()}
        </Typography>
        <Typography variant="subtitle1">
          {m.HOME_MOST_LIKED_COLLECTIONS_DESCRIPTION()}
        </Typography>
      </Stack>

      <BigCardGrid>
        <LikedCollectionsContent />
      </BigCardGrid>
      <Stack direction="row" justifyContent="center">
        <ButtonLink fullWidth={false} variant="contained" to="/search">
          {m.HOME_VIEW_ALL_COLLECTIONS_BUTTON()}
        </ButtonLink>
      </Stack>
    </Stack>
  );
}

function LikedCollectionsContent() {
  const { data } = useSuspenseQuery(
    getMostLikedCollectionsOptions({
      query: { limit: 4 },
    }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}
