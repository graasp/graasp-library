import type { JSX } from 'react';

import {
  Alert,
  Box,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { CollectionItem } from '~/components/ui/CollectionItem';
import { MY_LIKES_COLLECTIONS_ID } from '~/config/selectors';
import {
  getCurrentAccountOptions,
  getLikesForCurrentMemberOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

export const Route = createFileRoute('/liked')({
  component: RouteComponent,
});

function RouteComponent(): JSX.Element | null {
  const { data: member, isLoading } = useQuery(getCurrentAccountOptions());

  if (member?.id) {
    return (
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Typography variant="h5">{m.LIKED_ITEMS()}</Typography>
        <Box sx={{ mt: 4 }}>
          <MyLikes />
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return <Skeleton />;
  }

  // todo: currently member response is not empty when member is logged out, so we default to unauthorized
  return (
    <Box p={5}>
      <Alert severity="error">{m.UNEXPECTED_ERROR_MESSAGE()}</Alert>
    </Box>
  );
}

function MyLikes() {
  const { data: itemLikes } = useQuery(getLikesForCurrentMemberOptions());
  const collections = itemLikes?.map((itemLike) => itemLike.item);

  return (
    <Grid container id={MY_LIKES_COLLECTIONS_ID}>
      {collections?.map((collection) => (
        <Grid key={collection.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CollectionItem
            collection={{
              ...collection,
              creator: {
                name: collection.creator?.name ?? '',
                id: collection.creator?.id ?? '',
              },
              content: '',
              description: collection.description ?? '',
              level: Array<string>(),
              discipline: Array<string>(),
              'resource-type': Array<string>(),
              isPublishedRoot: true,
              isHidden: false,
              // HACK: this is not completely correct
              publicationUpdatedAt: collection.updatedAt,
              // HACK: this should come from the backend
              likes: 0,
              _formatted: {
                ...collection,
                name: collection.name,
                description: collection.description ?? '',
                content: '',
                creator: {
                  name: collection.creator?.name ?? '',
                  id: collection.creator?.id ?? '',
                },
                level: Array<string>(),
                discipline: Array<string>(),
                'resource-type': Array<string>(),
                isPublishedRoot: true,
                isHidden: false,
                publicationUpdatedAt: collection.updatedAt,
                // HACK: this should come from the backend
                likes: 0,
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
