import { Suspense, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { buildCollectionRoute } from '~/config/routes';
import { getFeaturedCollectionsOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { SearchHit } from '~/openapi/client/types.gen';
import { m } from '~/paraglide/messages';
import { mapTags } from '~/utils/collections';

import CardThumbnail from '../common/Card/CardThumbnail';
import { TagList } from '../common/Card/TagList';
import { ButtonLink } from '../common/links/ButtonLink';

const CARD_HEIGHT = 120;
const GRID_SIZE = { xs: 12, sm: 6, md: 6, lg: 4, xl: 4 };

export function FeaturedCollections() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const minimalNbToShow = isSmall ? 3 : 6;
  const [nbToShow, setNbToShow] = useState(minimalNbToShow);

  return (
    <Stack gap={5}>
      <Stack>
        <Typography variant="h3">
          {m.HOME_GRAASPER_COLLECTIONS_TITLE()}
        </Typography>
        <Typography variant="subtitle1">
          {m.HOME_FEATURED_DESCRIPTION()}
        </Typography>
      </Stack>
      <Grid id="featuredCollectionsGrid" container spacing={3}>
        <Suspense
          fallback={
            // use 6 elements since the possible combinations are 1, 2 and 3 per row, so we always have full rows
            Array.from({ length: nbToShow }, (_k, x) => x).map((elem) => (
              <Grid key={elem} size={GRID_SIZE}>
                <Skeleton variant="rounded" width="100%" height={CARD_HEIGHT} />
              </Grid>
            ))
          }
        >
          <ErrorBoundary fallback={<ErrorLoadingCollections />}>
            <HighlightedCollections limit={nbToShow} />
          </ErrorBoundary>
        </Suspense>
      </Grid>
      <Stack direction="row" justifyContent="center" gap={3}>
        <Button
          fullWidth={false}
          variant="outlined"
          onClick={() => {
            setNbToShow((nb) => nb + minimalNbToShow);
          }}
        >
          {m.HOME_VIEW_MORE_BUTTON({ count: minimalNbToShow })}
        </Button>
        <ButtonLink fullWidth={false} variant="contained" to="/search">
          {m.HOME_VIEW_ALL_COLLECTIONS_BUTTON()}
        </ButtonLink>
      </Stack>
    </Stack>
  );
}

function ErrorLoadingCollections() {
  return <Alert severity="error">{m.ERROR_LOADING_COLLECTIONS()}</Alert>;
}

function HighlightedCollections({ limit }: Readonly<{ limit: number }>) {
  const { data } = useSuspenseQuery(
    getFeaturedCollectionsOptions({
      query: { limit },
    }),
  );
  return data.hits.map((collection) => (
    <Grid size={GRID_SIZE} key={collection.id}>
      <FeaturedCard height={CARD_HEIGHT} collection={collection} />
    </Grid>
  ));
}

const FeaturedCard = ({
  collection,
  height,
}: Readonly<{ collection: SearchHit; height: number }>) => {
  const { name, id, type, thumbnails } = collection;

  const link = buildCollectionRoute(id);

  const tags = mapTags(collection);

  return (
    <Card
      // light zoom effect on hover
      sx={{
        boxShadow:
          '8px 14px 10px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03)',
        transition: 'all .5s ease' /* back to normal */,
        '&:hover': {
          transform: 'translate3D(0,-1px,0) scale(1.03)',
          boxShadow:
            '8px 28px 30px rgba(39,44,49,.07), 1px 6px 12px rgba(39,44,49,.04)',
          transition: 'all .4s ease' /* zoom in */,
        },
      }}
    >
      <Stack height={height} direction="row" alignItems="center">
        <Box height="100%" flex={1}>
          <Link to={link} title={name}>
            <CardThumbnail
              id={id}
              minHeight={height}
              thumbnail={thumbnails?.medium}
              alt={`thumbnail for ${name}`}
              type={type}
            />
          </Link>
        </Box>
        <Stack
          flex={2}
          gap={1}
          p={2}
          minWidth={0}
          justifyContent="space-between"
          height="100%"
        >
          <Stack
            gap={1}
            width="100%"
            overflow="hidden"
            flex={1}
            justifyContent="space-between"
          >
            <Link
              to={link}
              style={{
                textDecoration: 'unset',
                fontWeight: 'bold',
                color: 'unset',
                cursor: 'pointer',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </Link>
            <TagList maxNbOfLines={1} tags={tags} />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
