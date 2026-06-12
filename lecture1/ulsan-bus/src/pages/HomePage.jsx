import { Box } from '@mui/material'
import BusSearchBar from '../components/BusSearchBar'
import FavoriteDestinations from '../components/FavoriteDestinations'
import FavoriteRoutes from '../components/FavoriteRoutes'
import FavoriteStops from '../components/FavoriteStops'
import RouteSearch from '../components/RouteSearch'

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
      {/* 출발지/도착지 검색 */}
      <Box sx={{ mt: '16px', mb: '50px' }}>
        <RouteSearch />
      </Box>

      {/* 자주 가는 목적지 */}
      <Box sx={{ mb: '50px' }}>
        <FavoriteDestinations />
      </Box>

      {/* 버스 검색 (타이틀→입력창 12px은 BusSearchBar 내부) */}
      <Box sx={{ mb: '24px' }}>
        <BusSearchBar />
      </Box>

      {/* 정류장 찾기 */}
      <Box sx={{ mb: '30px' }}>
        <FavoriteStops />
      </Box>

      {/* 노선찾기 */}
      <FavoriteRoutes />
    </Box>
  )
}

export default HomePage
