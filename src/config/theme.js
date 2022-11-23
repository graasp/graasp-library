import { blue, grey, orange } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: blue,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange,
      color: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 14,
  },
});

export default responsiveFontSizes(theme);
