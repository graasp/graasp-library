import { blue, grey, orange } from '@material-ui/core/colors';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

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
