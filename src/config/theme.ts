import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  zIndex: {
    drawer: 100,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[400],
        },
      },
    },
  },
});
