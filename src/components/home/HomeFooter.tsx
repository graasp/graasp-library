import { ArrowForward } from '@mui/icons-material';
import { Button, Stack, Typography, styled } from '@mui/material';

import { CLIENT_HOME_ROUTE } from '~/config/paths';
import { m } from '~/paraglide/messages';

const StartButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textTransform: 'none',
  backgroundColor: 'rgba(255,255,255,0.85)',
  '&:hover': {
    backgroundColor: 'white',
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

export function HomeFooter() {
  return (
    <Stack gap={5} direction="column">
      <Typography variant="h3" component="h4" color="white">
        {m.HOME_VIEW_MORE_IN_LIBRARY_BUTTON()}
      </Typography>
      <Stack direction="row" justifyContent="center">
        <a href={CLIENT_HOME_ROUTE}>
          <StartButton
            fullWidth={false}
            size="large"
            endIcon={<ArrowForward />}
          >
            {m.HOME_FOOTER_START_BUTTON()}
          </StartButton>
        </a>
      </Stack>
    </Stack>
  );
}
