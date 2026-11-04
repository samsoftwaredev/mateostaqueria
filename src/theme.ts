import { createTheme } from '@mui/material/styles';
export const palette = {
  royal: '#0069C9',
  bright: '#10A7DA',
  navy: '#092C52',
  ink: '#18324B',
  cream: '#FCF9F2',
  sage: '#778F62',
  forest: '#41684E',
  line: '#E8E9E5',
};
export const theme = createTheme({
  palette: {
    primary: { main: palette.royal, contrastText: '#fff' },
    secondary: { main: palette.forest },
    background: { default: '#FFFEFB', paper: '#fff' },
    text: { primary: palette.navy, secondary: '#506071' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", Arial, sans-serif',
    h1: { fontFamily: '"Barlow Condensed", Impact, sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Barlow Condensed", Impact, sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Barlow Condensed", Impact, sans-serif', fontWeight: 800 },
    h4: { fontFamily: '"Barlow Condensed", Impact, sans-serif', fontWeight: 800 },
    h5: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 800 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minHeight: '100%',
          height: 'auto',
          overflowX: 'hidden',
        },
        body: {
          minHeight: '100%',
          height: 'auto',
          overflowX: 'hidden',
          overflowY: 'auto',
        },
        '#root': {
          display: 'block',
          width: '100%',
          minHeight: '100%',
          height: 'auto',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 99, padding: '11px 22px', boxShadow: 'none', fontWeight: 800 },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 9px 20px rgba(0,105,201,.18)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 20, boxShadow: 'none', border: '1px solid #ECEBE6' },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});
