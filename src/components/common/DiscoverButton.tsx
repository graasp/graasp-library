import { ArrowForward } from '@mui/icons-material';
import { Box, styled } from '@mui/material';

import LibraryIcon from '../ui/icons/LibraryIcon';
import { ButtonLink } from './links/ButtonLink';

const StyledButtonLink = styled(ButtonLink)(({ theme }) => ({
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

export function DiscoverButton({ message }: Readonly<{ message: string }>) {
  return (
    <StyledButtonLink
      to="/search"
      endIcon={<ArrowForward />}
      sx={{ color: 'white' }}
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
    </StyledButtonLink>
  );
}
