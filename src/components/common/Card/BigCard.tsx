import type { JSX, ReactNode } from 'react';
import { Suspense } from 'react';

import {
  Alert,
  Box,
  Grid,
  Card as MuiCard,
  Skeleton,
  Stack,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { Link } from '@tanstack/react-router';

import { CollectionContainer } from '~/components/ui/CollectionItem';
import { m } from '~/paraglide/messages';

import CardThumbnail from './CardThumbnail';
import { LikeCounter } from './LikeCounter';
import { TagList, TagListProps } from './TagList';
import TitleAndDescription from './TitleAndDescription';

type CardProps = Readonly<{
  name: string;
  height: number;
  id: string;
  type: DiscriminatedItem['type'];
  description: string | null;
  likeCount?: number;
  tags?: TagListProps['tags'];
  image?: string | null;
  link: string;
  creator: ReactNode;
  contentOverImage?: JSX.Element | null;
}>;

export function BigCard({
  id,
  creator,
  name,
  image,
  link,
  description,
  tags,
  type,
  height,
  likeCount = 0,
  contentOverImage,
}: CardProps): JSX.Element {
  return (
    <MuiCard
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
            <Stack position="relative">
              <Box position="absolute" p={1} width="100%">
                {contentOverImage}
              </Box>
            </Stack>
            <CardThumbnail
              id={id}
              minHeight={height}
              thumbnail={image}
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
          // width="100%"
        >
          <Stack gap={1} width="100%" overflow="hidden" flex={1}>
            <Link
              to={link}
              style={{
                textDecoration: 'unset',
                color: 'unset',
                cursor: 'pointer',
                wordBreak: 'break-word',
              }}
            >
              <TitleAndDescription
                link={link}
                name={name}
                description={description}
              />
            </Link>
          </Stack>
          <Stack gap={1} justifyContent="flex-end">
            <TagList tags={tags} />
            <Stack
              direction="row"
              gap={1}
              justifyContent="space-between"
              alignItems="center"
            >
              {creator}
              <Stack marginLeft="auto">
                <LikeCounter likeCount={likeCount} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MuiCard>
  );
}

type Props = {
  children: ReactNode;
  id?: string;
};

export function BigCardGrid({ id, children }: Readonly<Props>) {
  return (
    <CollectionContainer id={id}>
      <Suspense
        fallback={['1', '2', '3', '4'].map((elem) => (
          <Grid key={elem} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Skeleton variant="rounded" width="100%" height="230px" />
          </Grid>
        ))}
      >
        <ErrorBoundary fallback={<ErrorLoadingCollections />}>
          {children}
        </ErrorBoundary>
      </Suspense>
    </CollectionContainer>
  );
}

function ErrorLoadingCollections() {
  return <Alert severity="error">{m.ERROR_LOADING_COLLECTIONS()}</Alert>;
}
