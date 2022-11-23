import React, { FC } from 'react';

import { Typography, styled } from '@mui/material';

type Props = {
  href: string;
  id?: string;
  text: string;
};

const StyledLink = styled('a')(() => ({
  textDecoration: 'none',
  color: 'white',
}));

const HeaderLink: FC<Props> = ({ href, id, text }) => (
  <StyledLink href={href}>
    <Typography variant="h6" color="inherit" mx={2} id={id}>
      {text}
    </Typography>
  </StyledLink>
);

export default HeaderLink;
