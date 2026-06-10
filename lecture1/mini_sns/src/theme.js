import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4DA6FF',
      light: '#7DC1FF',
      dark: '#2A7FCC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F8F4E9',
      dark: '#E8E0C8',
      contrastText: '#333333',
    },
    background: {
      default: '#F8F4E9',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    h4: { fontSize: '1.125rem', fontWeight: 600 },
    h5: { fontSize: '1rem', fontWeight: 500 },
    h6: { fontSize: '0.875rem', fontWeight: 500 },
  },
  spacing: 8,
  shape: { borderRadius: 12 },
})

export default theme
