import { Box } from '@mui/material'
import BusSearchBar from '../components/BusSearchBar'
import FavoriteDestinations from '../components/FavoriteDestinations'
import FavoriteRoutes from '../components/FavoriteRoutes'
import FavoriteStops from '../components/FavoriteStops'
import RouteSearch from '../components/RouteSearch'

const SECTION_GAP = '50px'
const APP_MARGIN = '24px'

function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        px: APP_MARGIN,
        pb: '50px',
      }}
    >
      <Box sx={{ mt: '16px', mb: SECTION_GAP }}>
        <RouteSearch />
      </Box>
      <Box sx={{ mb: SECTION_GAP }}>
        <FavoriteDestinations />
      </Box>
      <Box sx={{ mb: SECTION_GAP }}>
        <BusSearchBar />
      </Box>
      <Box sx={{ mb: SECTION_GAP }}>
        <FavoriteStops />
      </Box>
      <FavoriteRoutes />
    </Box>
  )
}

export default HomePage
