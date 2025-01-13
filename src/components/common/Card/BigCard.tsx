import Link from 'next/link';

import { Box, Card as MuiCard, Stack, Typography } from '@mui/material';

import { DiscriminatedItem, UUID } from '@graasp/sdk';
import { Avatar, useMobileView } from '@graasp/ui';

import { CollapsibleText } from '../CollapsibleText/CollapsibleText';
import CardThumbnail from './CardThumbnail';
import { LikeCounter } from './LikeCounter';
import { TagList, TagListProps } from './TagList';

const HEIGHT = 230;
const MAX_NUMBER_OF_LINES = 4;

type CardProps = {
  readonly name: string;
  readonly id: string;
  readonly type: DiscriminatedItem['type'];
  readonly description: string | null;
  readonly likeCount?: number;
  readonly tags?: TagListProps['tags'];
  readonly image?: string;
  readonly link: string;
  readonly creator?: {
    name: string;
    id: UUID;
    avatar?: string;
    link: string;
    isLoading?: boolean;
  } | null;
  readonly contentOverImage?: JSX.Element;
};

// eslint-disable-next-line react/function-component-definition
export function BigCard({
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
}: CardProps): JSX.Element {
  const { isMobile } = useMobileView();

  // merge name and description together
  // so we can count name and description in the same line count
  // it will take advantage of showing the full title if there's space from no description
  const text = `<h3>${name}</h3>${description ?? ''}`;

  return (
    <MuiCard>
      <Stack height={HEIGHT} direction="row" alignItems="center">
        <Box style={{ height: '100%', minWidth: '30%' }}>
          <Link href={link} title={name}>
            <Stack height="100%" position="relative">
              {contentOverImage ? (
                <Box sx={{ position: 'absolute', p: 1 }} width="100%">
                  {contentOverImage}
                </Box>
              ) : null}
              <CardThumbnail
                id={id}
                minHeight={HEIGHT}
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
                  title={creator.name}
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
                      alt={`avatar of ${creator.name}`}
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
              <Stack width={creator ? undefined : '100%'} alignItems="flex-end">
                <LikeCounter likeCount={likeCount} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MuiCard>
  );
}
