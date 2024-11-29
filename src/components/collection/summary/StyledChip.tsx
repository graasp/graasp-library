import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

import { Chip, useTheme } from '@mui/material';

export const StyledChip = ({
  href,
  label,
}: {
  href: { pathname: string; query: string | ParsedUrlQuery };
  label: string;
}) => {
  const theme = useTheme();
  return (
    <Chip
      component={Link}
      href={href}
      label={label}
      sx={{
        '&:hover': {
          cursor: 'pointer',
          background: theme.palette.primary.main,
          color: 'white',
        },
      }}
    />
  );
};
