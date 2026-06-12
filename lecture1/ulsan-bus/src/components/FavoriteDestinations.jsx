import { Box, Card, IconButton, Typography } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import BusTypeBadge from './BusTypeBadge'

const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: '우리집',
    icon: 'home',
    buses: [
      { number: '753', type: '일반', arrival: null, stops: 1 },
      { number: '492', type: '순환', arrival: 5, stops: 7 },
    ],
  },
  {
    id: 2,
    name: '회사',
    icon: 'work',
    buses: [
      { number: '512', type: '일반', arrival: 3, stops: 2 },
      { number: '1002', type: '좌석', arrival: 7, stops: 7 },
    ],
  },
]

function DestinationIcon({ type }) {
  const sx = { fontSize: 18, color: 'text.secondary', mr: 1 }
  if (type === 'home') return <HomeOutlinedIcon sx={sx} />
  return <BusinessCenterOutlinedIcon sx={sx} />
}

function ArrivalText({ arrival, stops }) {
  return (
    <Box sx={{ textAlign: 'right' }}>
      <Typography
        component="span"
        sx={{ fontSize: '15px', fontWeight: 500, color: '#E53935' }}
      >
        {arrival === null ? '곧 도착' : `약 ${arrival}분`}
      </Typography>
      <Typography
        component="span"
        variant="caption"
        color="text.secondary"
        sx={{ ml: 0.5 }}
      >
        ({stops}전)
      </Typography>
    </Box>
  )
}

function FavoriteDestinations() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        <Typography variant="h2">자주 가는 목적지</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'primary.main',
            cursor: 'pointer',
          }}
        >
          <Typography variant="caption" color="primary.main" fontWeight={500}>
            목적지 추가
          </Typography>
          <AddCircleOutlineIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {MOCK_DESTINATIONS.map((dest) => (
          <Card key={dest.id} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <DestinationIcon type={dest.icon} />
              <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'text.secondary' }}>
                {dest.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {dest.buses.map((bus, idx) => (
                <Box
                  key={idx}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DirectionsBusIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.75 }} />
                    <Typography
                      component="span"
                      sx={{ fontWeight: 700, fontSize: '18px', color: 'text.primary' }}
                    >
                      {bus.number}
                    </Typography>
                    <BusTypeBadge type={bus.type} />
                  </Box>
                  <ArrivalText arrival={bus.arrival} stops={bus.stops} />
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default FavoriteDestinations
