import Link from 'next/link';

import { styled } from '@mui/material';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const HeaderLinkComponent = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => <StyledLink href="/">{children}</StyledLink>;

export default HeaderLinkComponent;
