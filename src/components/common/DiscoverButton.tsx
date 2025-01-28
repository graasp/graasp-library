import { ArrowForward } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

import { LibraryIcon } from '@graasp/ui';

import Link from 'next/link';

import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 6),
  },
  backgroundColor: 'transparent',
  textTransform: 'none',
  ':hover': {
    transition: 'background-color 500ms linear',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  '&:hover > .MuiButton-endIcon': {
    '@keyframes bounce': {
      '0%': { transform: 'translateX(0px)' },
      '30%': { transform: 'translateX(15px)' },
      '85%': { transform: 'translateX(0px)' },
    },
    animationName: 'bounce',
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
  },
}));

type Props = {
  message: string;
};

const DiscoverButton = ({ message }: Props) => {
  return (
    <StyledButton
      LinkComponent={Link}
      href={ALL_COLLECTIONS_ROUTE}
      endIcon={<ArrowForward />}
      color="secondary"
    >
      <Box display="inline">
        <LibraryIcon
          size={30}
          sx={{ mr: 1, verticalAlign: 'middle', mt: '-3px' }}
          secondaryColor="transparent"
          primaryColor="white"
        />
        {message}
      </Box>
    </StyledButton>
  );
};

export default DiscoverButton;
