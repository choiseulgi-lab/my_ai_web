import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#E8000D' },
    secondary: { main: '#333333' },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8,
})

export default theme
