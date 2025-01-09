import Link from 'next/link';

import { Box, Card as MuiCard, Stack, Typography } from '@mui/material';

import { DiscriminatedItem, UUID } from '@graasp/sdk';
import { Avatar, useMobileView } from '@graasp/ui';

import { CollapsibleText } from '../CollapsibleText/CollapsibleText';
import CardThumbnail, { CardThumbnailProps } from './CardThumbnail';
import { LikeCounter } from './LikeCounter';
import { TagList, TagListProps } from './TagList';

const MAX_NUMBER_OF_LINES = 3;
const height = 170;

type CardProps = {
  name: string;
  id: string;
  type: DiscriminatedItem['type'];
  description: string | null;
  likeCount?: number;
  tags?: TagListProps['tags'];
  image?: string;
  link: string;
  creator?: {
    name: string;
    id: UUID;
    avatar?: string;
    link: string;
    isLoading?: boolean;
  };
  contentOverImage?: JSX.Element;
  mimetype?: CardThumbnailProps['mimetype'];
};

export const BigCard = ({
  id,
  creator,
  name,
  image,
  link,
  description,
  tags,
  type,
  likeCount = 0,
  contentOverImage,
  mimetype,
}: CardProps): JSX.Element => {
  const { isMobile } = useMobileView();

  // merge name and description together
  // so we can count name and description in the same line count
  // it will take advantage of showing the full title if there's space from no description
  const text = `<h3>${name}</h3>${description ?? ''}`;

  return (
    <MuiCard id={id}>
      <Stack height={height} direction="row" alignItems="center">
        <Box style={{ height: '100%', minWidth: '30%' }}>
          <Link href={link}>
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
                alt={name}
                type={type}
                mimetype={mimetype}
              />
            </Stack>
          </Link>
        </Box>
        <Stack
          mx={{ xs: 1, sm: 2 }}
          gap={1}
          py={1}
          minWidth={0}
          justifyContent="space-between"
          height="100%"
          width="100%"
        >
          <Stack gap={1}>
            <Stack>
              <Link
                href={link}
                style={{
                  textDecoration: 'unset',
                  color: 'unset',
                  cursor: 'pointer !important',
                  height: '100%',
                  display: 'block',
                }}
              >
                <CollapsibleText
                  collapsed
                  numberOfLinesToShow={MAX_NUMBER_OF_LINES}
                  content={text}
                  style={link ? { cursor: 'pointer' } : undefined}
                />
              </Link>
            </Stack>
          </Stack>
          <Stack gap={1} justifyContent="flex-end">
            <TagList tags={tags} />
            <Stack
              direction="row"
              gap={1}
              justifyContent="space-between"
              alignItems="center"
            >
              {creator && (
                <Link
                  href={creator.link}
                  style={{
                    textDecoration: 'unset',
                    color: 'unset',
                    minWidth: 0,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={1}
                    minWidth={0}
                    mr={1}
                  >
                    <Avatar
                      component="avatar"
                      alt={creator.name}
                      sx={{ fontSize: '14px' }}
                      maxHeight={24}
                      maxWidth={24}
                      // use broken path to show first letter
                      url={creator.avatar?.length ? creator.avatar : '/broken'}
                      isLoading={creator.isLoading}
                    />
                    {!isMobile && (
                      <Typography align="right" noWrap variant="body2">
                        {creator.name}
                      </Typography>
                    )}
                  </Stack>
                </Link>
              )}
              <Stack>
                <LikeCounter likeCount={likeCount} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MuiCard>
  );
};
