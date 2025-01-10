import Link from 'next/link';

import { Stack, Typography, useTheme } from '@mui/material';

import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@graasp/ui';

import { UrlSearch } from '../../../config/constants';
import { ALL_COLLECTIONS_ROUTE } from '../../../config/routes';

const Tag = ({ title }: { title: string }): JSX.Element => {
  const theme = useTheme();
  return (
    <Link
      href={{
        pathname: ALL_COLLECTIONS_ROUTE,
        query: { [UrlSearch.KeywordSearch]: title },
      }}
      style={{
        textDecoration: 'none',
        color: theme.palette.primary.main,
      }}
    >
      <Typography
        variant="body2"
        component="span"
        px={1}
        borderRadius={2}
        ml={0}
        mr={1}
        noWrap
        sx={{
          backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
        }}
      >
        {title}
      </Typography>
    </Link>
  );
};

export type TagListProps = {
  tags?: string[];
};

export const TagList = ({ tags }: TagListProps): JSX.Element | null => {
  if (!tags?.length) {
    return null;
  }

  return (
    <Stack
      direction="row"
      maxWidth="100%"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        overflow: 'hidden',
        height: '100%',
        maxHeight: '50px', // computed height for 2 lines
      }}
    >
      {tags.map((t) => (
        <Tag key={t?.toString()} title={t} />
      ))}
    </Stack>
  );
};
