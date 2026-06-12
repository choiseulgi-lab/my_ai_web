import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box, IconButton, InputBase, List, ListItem,
  ListItemText, Typography
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const MOCK_STOPS = [
  { stop_id: '40118', stop_name: '(구)세인트고등학교', direction: '신온마을방면' },
  { stop_id: '40118', stop_name: '(주)SLT', direction: '신온마을방면' },
  { stop_id: '40118', stop_name: 'G마트', direction: '신온마을방면' },
  { stop_id: '40118', stop_name: 'KBS방송국앞', direction: '신온마을방면' },
  { stop_id: '40118', stop_name: 'KCC산단진입구', direction: '신온마을방면' },
  { stop_id: '40419', stop_name: '현대백화점사거리', direction: '좋은의사들안과병원 방면' },
  { stop_id: '10506', stop_name: '병영사거리', direction: '중구보건소 방면' },
  { stop_id: '22419', stop_name: '대공원호반베르디움', direction: '산학융합지구캠퍼스 방면' },
  { stop_id: '40120', stop_name: '울산역', direction: '시내방면' },
  { stop_id: '40121', stop_name: '문수경기장', direction: '옥동방면' },
  { stop_id: '40122', stop_name: '울산대학교', direction: '공업탑방면' },
  { stop_id: '40123', stop_name: '태화강역', direction: '시청방면' },
]

const MOCK_ROUTES = [
  { route_number: '753', route_type: '일반', interval_minutes: 45, start_point: '명촌차고지(기점)', end_point: '울산과학기술원(종점)' },
  { route_number: '743', route_type: '일반', interval_minutes: 45, start_point: '명촌차고지(기점)', end_point: '울산과학기술원(종점)' },
  { route_number: '492', route_type: '순환', interval_minutes: 20, start_point: '울산역(기점)', end_point: '울산역(종점)' },
  { route_number: '512', route_type: '일반', interval_minutes: 30, start_point: '삼산동(기점)', end_point: '울산역(종점)' },
  { route_number: '1002', route_type: '좌석', interval_minutes: 60, start_point: '언양(기점)', end_point: '울산역(종점)' },
  { route_number: '127', route_type: '일반', interval_minutes: 15, start_point: '울산역(기점)', end_point: '신복로터리(종점)' },
]

const TYPE_COLORS = {
  일반: { bg: '#E8F0FB', text: '#2D6CDF' },
  순환: { bg: '#E0F5F5', text: '#00A8A8' },
  좌석: { bg: '#FFF0EA', text: '#FF6B35' },
  급행: { bg: '#FFF3E0', text: '#E65100' },
}

function BadgeInline({ type }) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS['일반']
  return (
    <Box
      component="span"
      sx={{
        px: 0.75, py: 0.2,
        borderRadius: 1,
        fontSize: '11px', fontWeight: 600,
        bgcolor: colors.bg, color: colors.text,
        mr: 0.75,
      }}
    >
      {type}
    </Box>
  )
}

function StopSearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultTab = searchParams.get('tab') === 'routes' ? 'routes' : 'stops'
  const [tab, setTab] = useState(defaultTab)
  const [query, setQuery] = useState('')

  const filteredStops = MOCK_STOPS.filter(
    (s) =>
      s.stop_name.includes(query) ||
      s.stop_id.includes(query) ||
      s.direction.includes(query)
  )

  const filteredRoutes = MOCK_ROUTES.filter(
    (r) =>
      r.route_number.includes(query) ||
      r.route_type.includes(query)
  )

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
        <Box
          sx={{
            flex: 1, display: 'flex', alignItems: 'center',
            bgcolor: '#F5F6FA', borderRadius: '10px', px: 1.5, py: 0.75,
          }}
        >
          <SearchIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />
          <InputBase
            autoFocus
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="정류장명, 정류장번호 또는 버스번호로 검색하세요"
            sx={{
              fontSize: '14px',
              '& input::placeholder': { color: 'text.disabled', opacity: 1 },
            }}
          />
        </Box>
      </Box>

      {/* 탭 */}
      <Box sx={{ px: '24px', pt: 2, pb: 1.5, display: 'flex', gap: 1 }}>
        {['stops', 'routes'].map((t) => (
          <Box
            key={t}
            onClick={() => setTab(t)}
            sx={{
              flex: 1, py: 1, textAlign: 'center',
              borderRadius: '8px',
              border: '1.5px solid',
              borderColor: tab === t ? 'primary.main' : 'divider',
              bgcolor: tab === t ? '#EEF3FF' : 'background.paper',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px', fontWeight: 600,
                color: tab === t ? 'primary.main' : 'text.disabled',
              }}
            >
              {t === 'stops' ? '정류장' : '노선'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 결과 리스트 */}
      <Box sx={{ px: '24px' }}>
        {tab === 'stops' ? (
          filteredStops.map((stop, idx) => (
            <Box
              key={idx}
              sx={{
                py: 1.75,
                borderBottom: '1px solid', borderColor: 'divider',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F8F9FA', mx: -3, px: 3 },
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500, color: 'text.primary' }}>
                    {stop.stop_name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    ({stop.stop_id})
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {stop.direction}
                </Typography>
              </Box>
              <ArrowForwardIosIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            </Box>
          ))
        ) : (
          filteredRoutes.map((route, idx) => (
            <Box
              key={idx}
              onClick={() => navigate(`/routes/${route.route_number}`)}
              sx={{
                py: 1.75,
                borderBottom: '1px solid', borderColor: 'divider',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F8F9FA', mx: -3, px: 3 },
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.25 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500, color: 'text.primary', mr: 0.5 }}>
                    {route.route_number}
                  </Typography>
                  <BadgeInline type={route.route_type} />
                  <Typography variant="caption" color="text.secondary">
                    · 배차 {route.interval_minutes}분
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">{route.start_point}</Typography>
                  <Typography variant="caption" color="text.disabled">→</Typography>
                  <Typography variant="caption" color="text.secondary">{route.end_point}</Typography>
                </Box>
              </Box>
              <ArrowForwardIosIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  )
}

export default StopSearchPage
