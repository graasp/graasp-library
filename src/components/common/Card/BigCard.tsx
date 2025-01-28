import { ReactNode } from 'react';

import { Box, Card as MuiCard, Stack } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';
import { useMobileView } from '@graasp/ui';

import Link from 'next/link';

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
  contentOverImage?: JSX.Element;
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
  const { isMobile } = useMobileView();

  return (
    <MuiCard
      // light zoom effect on hover
      sx={
        !isMobile
          ? {
              boxShadow:
                '8px 14px 10px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03)',
              transition: 'all .5s ease' /* back to normal */,
              '&:hover': {
                transform: 'translate3D(0,-1px,0) scale(1.03)',
                boxShadow:
                  '8px 28px 30px rgba(39,44,49,.07), 1px 6px 12px rgba(39,44,49,.04)',
                transition: 'all .4s ease' /* zoom in */,
              },
            }
          : {}
      }
    >
      <Stack height={height} direction="row" alignItems="center">
        <Box height="100%" minWidth="30%">
          <Link href={link} title={name}>
            <Stack height="100%" position="relative">
              {contentOverImage ? (
                <Box sx={{ position: 'absolute', p: 1 }} width="100%">
                  {contentOverImage}
                </Box>
              ) : null}
              <CardThumbnail
                id={id}
                minHeight={height}
                thumbnail={image}
                alt={`thumbnail for ${name}`}
                type={type}
              />
            </Stack>
          </Link>
        </Box>
        <Stack
          gap={1}
          p={{ xs: 1, sm: 2 }}
          minWidth={0}
          justifyContent="space-between"
          height="100%"
          width="100%"
        >
          <Stack gap={1}>
            <TitleAndDescription
              link={link}
              name={name}
              description={description}
            />
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
