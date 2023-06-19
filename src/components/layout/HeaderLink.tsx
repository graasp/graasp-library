import Link from 'next/link';

import React, { FC } from 'react';

import { Typography } from '@mui/material';

type Props = {
  href: string;
  id?: string;
  text: string;
};

const HeaderLink: FC<Props> = ({ href, id, text }) => (
  <Typography
    sx={{ textDecoration: 'none' }}
    component={Link}
    href={href}
    variant="h6"
    color="inherit"
    mx={2}
    id={id}
  >
    {text}
  </Typography>
);

export default HeaderLink;
