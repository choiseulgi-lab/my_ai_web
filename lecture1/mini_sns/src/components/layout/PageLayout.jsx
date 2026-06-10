import { Box } from '@mui/material'
import TopBar from './TopBar.jsx'
import BottomNav from './BottomNav.jsx'

function PageLayout({ children }) {
  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <TopBar />
      <Box sx={{ pt: '56px', pb: '72px' }}>
        {children}
      </Box>
      <BottomNav />
    </Box>
  )
}

export default PageLayout
