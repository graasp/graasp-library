import { ReactNode } from 'react';

import { styled } from '@mui/material';

import Link from 'next/link';

import { HEADER_GRAASP_LOGO_LINK_ID } from '../../config/selectors';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const HeaderLinkComponent = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <StyledLink id={HEADER_GRAASP_LOGO_LINK_ID} href="/">
    {children}
  </StyledLink>
);

export default HeaderLinkComponent;
