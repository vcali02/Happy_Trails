import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/';
// A custom theme for this app
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#B66551',
      light: '#C48373',
      // dark: '#7F4638',
    },
    secondary: {
      main: '#3393CD',
      light: '#5BA8D7',
      dark: '#23668F',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#282c34',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px 10px',
        margin: '10px',
        backgroundColor: '#fff', // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
export default theme;