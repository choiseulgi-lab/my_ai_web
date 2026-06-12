import { Box } from '@mui/material'
import BusSearchBar from '../components/BusSearchBar'
import FavoriteDestinations from '../components/FavoriteDestinations'
import FavoriteRoutes from '../components/FavoriteRoutes'
import FavoriteStops from '../components/FavoriteStops'
import RouteSearch from '../components/RouteSearch'

function HomePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
      <RouteSearch />
      <FavoriteDestinations />
      <BusSearchBar />
      <FavoriteStops />
      <FavoriteRoutes />
    </Box>
  )
}

export default HomePage
