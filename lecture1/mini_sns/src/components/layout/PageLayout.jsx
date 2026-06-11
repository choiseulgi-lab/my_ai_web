import { Box } from '@mui/material'
import TopBar from './TopBar.jsx'
import BottomNav from './BottomNav.jsx'

function PageLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <TopBar />
      <Box sx={{ pt: '108px', pb: '80px' }}>
        {children}
      </Box>
      <BottomNav />
    </Box>
  )
}

export default PageLayout
