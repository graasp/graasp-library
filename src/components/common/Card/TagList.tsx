import type { JSX } from 'react';

import { Stack } from '@mui/material';

import { categoryToQueryParams } from '~/components/filters/constants';
import { DEFAULT_LIGHT_PRIMARY_COLOR } from '~/components/ui/theme';
import { Tag } from '~/openapi/client';

import { TypographyLink } from '../links/TypographyLink';

type TagInfo = Pick<Tag, 'name' | 'category'>;

function TagComponent({ tag }: Readonly<{ tag: TagInfo }>): JSX.Element {
  return (
    <TypographyLink
      to="/search"
      search={{ [categoryToQueryParams[tag.category]]: [tag.name] }}
      variant="body2"
      px={1}
      borderRadius={2}
      noWrap
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
        '&:hover': {
          cursor: 'pointer',
          opacity: 0.8,
        },
      }}
    >
      {tag.name}
    </TypographyLink>
  );
}

export type TagListProps = Readonly<{
  tags?: TagInfo[];
  maxNbOfLines?: number;
}>;

export function TagList({
  tags,
  maxNbOfLines = 2,
}: TagListProps): JSX.Element | null {
  if (!tags?.length) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      gap="4px"
      overflow="hidden"
      maxHeight={`${maxNbOfLines}lh`} // display maximum x lines
    >
      {tags.map((t) => (
        <TagComponent key={`${t.category}-${t.name}`} tag={t} />
      ))}
    </Stack>
  );
}
