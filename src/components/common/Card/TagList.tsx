import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@graasp/ui';

const Tag = ({ title }: { title: string | ReactNode }): JSX.Element => {
  return (
    <Typography
      variant="body2"
      color="primary"
      component="span"
      px={1}
      borderRadius={2}
      mx={0}
      noWrap
      sx={{
        backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
      }}
    >
      {title}
    </Typography>
  );
};

export type TagListProps = {
  tags?: (string | ReactNode)[];
};

export const TagList = ({ tags }: TagListProps): JSX.Element | null => {
  if (!tags?.length) {
    return null;
  }

  return (
    <Stack
      direction="row"
      maxWidth={'100%'}
      alignItems="center"
      gap={1}
      flexWrap={'wrap'}
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
