import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'

const ROUTES_DATA = {
  '753': {
    route_number: '753',
    route_type: '일반',
    interval_minutes: 45,
    start_point: '명촌차고지(기점)',
    end_point: '울산과학기술원(종점)',
    forward_count: 5,
    backward_count: 3,
    stops: [
      { name: '명촌차고지(기점)', id: '40344', is_station: true },
      { name: '평강리버에이아파트앞', id: '40344', is_station: false },
      { name: '태화강역(2번 정류소)', id: '40344', is_station: true },
      { name: '이마트앞, 울산통계청', id: '40344', is_station: false },
      { name: '농수산물도매시장앞', id: '40344', is_station: true },
      { name: '농수산물도매시장앞', id: '40344', is_station: false },
      { name: '농수산물도매시장앞', id: '40344', is_station: true },
      { name: '농수산물도매시장앞', id: '40344', is_station: false },
      { name: '농수산물도매시장앞', id: '40344', is_station: false },
      { name: '농수산물도매시장앞', id: '40344', is_station: true },
      { name: '농수산물도매시장앞', id: '40344', is_station: false },
      { name: '농수산물도매시장앞', id: '40344', is_station: false },
      { name: '울산과학기술원(종점)', id: '40399', is_station: true },
    ],
  },
  '743': {
    route_number: '743',
    route_type: '일반',
    interval_minutes: 45,
    start_point: '명촌차고지(기점)',
    end_point: '울산과학기술원(종점)',
    forward_count: 4,
    backward_count: 2,
    stops: [
      { name: '명촌차고지(기점)', id: '40344', is_station: true },
      { name: '평강리버에이아파트앞', id: '40345', is_station: false },
      { name: '태화강역', id: '40346', is_station: true },
      { name: '울산과학기술원(종점)', id: '40399', is_station: true },
    ],
  },
  '492': {
    route_number: '492',
    route_type: '순환',
    interval_minutes: 20,
    start_point: '울산역(기점)',
    end_point: '울산역(종점)',
    forward_count: 6,
    backward_count: 0,
    stops: [
      { name: '울산역(기점)', id: '10100', is_station: true },
      { name: '태화강역', id: '10200', is_station: true },
      { name: '공업탑로터리', id: '10300', is_station: false },
      { name: '울산시청', id: '10400', is_station: true },
      { name: '울산역(종점)', id: '10100', is_station: true },
    ],
  },
}

const TYPE_COLORS = {
  일반: { bg: '#E8F0FB', text: '#2D6CDF' },
  순환: { bg: '#E0F5F5', text: '#00A8A8' },
  좌석: { bg: '#FFF0EA', text: '#FF6B35' },
}

function RouteDetailPage() {
  const { routeNumber } = useParams()
  const navigate = useNavigate()
  const route = ROUTES_DATA[routeNumber] || ROUTES_DATA['753']
  const [direction, setDirection] = useState('forward')
  const [starred, setStarred] = useState(false)
  const colors = TYPE_COLORS[route.route_type] || TYPE_COLORS['일반']

  const stops = direction === 'forward' ? route.stops : [...route.stops].reverse()

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* 헤더 */}
      <Box
        sx={{
          position: 'sticky', top: 0, zIndex: 100,
          bgcolor: 'background.paper',
          borderBottom: '1px solid', borderColor: 'divider',
          px: '24px', py: 1.5,
          display: 'flex', alignItems: 'center', gap: 1,
        }}
      >
        <IconButton size="small" onClick={() => navigate(-1)} sx={{ color: 'text.primary', p: 0.5 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontSize: '17px', fontWeight: 700, color: 'text.primary', flex: 1 }}>
          노선 정보
        </Typography>
      </Box>

      <Box sx={{ px: '24px', pt: 2 }}>
        {/* 노선 카드 */}
        <Box
          sx={{
            p: 2, mb: 2,
            borderRadius: '8px',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #1565C0, #7B1FA2) border-box',
            border: '2px solid transparent',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 700, color: 'text.primary' }}>
                {route.route_number}
              </Typography>
              <Box
                component="span"
                sx={{
                  px: 0.75, py: 0.2, borderRadius: 1,
                  fontSize: '11px', fontWeight: 600,
                  bgcolor: colors.bg, color: colors.text,
                }}
              >
                {route.route_type}
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setStarred(!starred)} sx={{ p: 0.5 }}>
              {starred
                ? <StarIcon sx={{ color: '#FFC107', fontSize: 22 }} />
                : <StarBorderIcon sx={{ color: '#FFC107', fontSize: 22 }} />
              }
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            {route.route_type} · 배차 {route.interval_minutes}분
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">{route.start_point}</Typography>
            <ArrowForwardIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography variant="caption" color="text.secondary">{route.end_point}</Typography>
          </Box>
        </Box>

        {/* 정방향 / 역방향 버튼 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Box
            onClick={() => setDirection('forward')}
            sx={{
              flex: 1, py: 1, textAlign: 'center',
              borderRadius: '8px',
              border: '1.5px solid',
              borderColor: direction === 'forward' ? 'primary.main' : 'divider',
              bgcolor: direction === 'forward' ? '#EEF3FF' : 'background.paper',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: direction === 'forward' ? 'primary.main' : 'text.disabled' }}>
              정방향 ({route.forward_count}대운행)
            </Typography>
          </Box>
          <Box
            onClick={() => setDirection('backward')}
            sx={{
              flex: 1, py: 1, textAlign: 'center',
              borderRadius: '8px',
              border: '1.5px solid',
              borderColor: direction === 'backward' ? 'primary.main' : 'divider',
              bgcolor: direction === 'backward' ? '#EEF3FF' : 'background.paper',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: direction === 'backward' ? 'primary.main' : 'text.disabled' }}>
              역방향 ({route.backward_count}대운행)
            </Typography>
          </Box>
        </Box>

        {/* 운행시간 정보 */}
        <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'text.primary', mb: 2 }}>
          운행시간 정보
        </Typography>

        {/* 정류장 타임라인 */}
        <Box sx={{ position: 'relative', pb: 4 }}>
          {/* 세로 라인 */}
          <Box
            sx={{
              position: 'absolute',
              left: 10, top: 8, bottom: 8,
              width: '2px',
              bgcolor: '#D0D5E8',
            }}
          />

          {stops.map((stop, idx) => {
            const isFirst = idx === 0
            const isLast = idx === stops.length - 1

            return (
              <Box
                key={idx}
                sx={{ display: 'flex', alignItems: 'center', mb: 0, py: 1.25, position: 'relative' }}
              >
                {/* 정류장 아이콘 */}
                <Box
                  sx={{
                    width: 22, height: 22,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: isFirst || isLast ? 'primary.main' : (stop.is_station ? '#4A7FD4' : '#D0D5E8'),
                    bgcolor: isFirst || isLast ? 'primary.main' : (stop.is_station ? '#fff' : '#fff'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {stop.is_station && (
                    <DirectionsBusIcon
                      sx={{
                        fontSize: 12,
                        color: isFirst || isLast ? '#fff' : 'primary.main',
                      }}
                    />
                  )}
                </Box>

                {/* 정류장 이름 */}
                <Box sx={{ ml: 2 }}>
                  <Typography
                    sx={{
                      fontSize: isFirst || isLast ? '15px' : '14px',
                      fontWeight: isFirst || isLast ? 600 : 400,
                      color: isFirst || isLast ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {stop.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    ({stop.id})
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default RouteDetailPage
