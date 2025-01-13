import Link from 'next/link';

import { Box, Card as MuiCard, Stack } from '@mui/material';

import { DiscriminatedItem, UUID } from '@graasp/sdk';
import { useMobileView } from '@graasp/ui';

import { CollapsibleText } from '../CollapsibleText/CollapsibleText';
import CardThumbnail from './CardThumbnail';
import { LikeCounter } from './LikeCounter';
import { MemberAvatar } from './MemberAvatar';
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
                // width={300}
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
                  <MemberAvatar
                    name={creator.name}
                    avatar={creator.avatar}
                    isLoading={creator.isLoading}
                  />
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
