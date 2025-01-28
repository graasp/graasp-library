import { Button } from '@mui/material';

import Link from 'next/link';

type Props = {
  href: string;
  id?: string;
  text: string;
};

const HeaderLink = ({ href, id, text }: Props): JSX.Element => (
  <Button
    sx={{
      textTransform: 'none',
      fontSize: 'large',
      marginLeft: 2,
      ':hover': { bgcolor: 'rgba(0,0,0,0.1)' },
    }}
    component={Link}
    href={href}
    id={id}
    color="inherit"
  >
    {text}
  </Button>
);

export default HeaderLink;
