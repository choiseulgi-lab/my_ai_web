import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box, CircularProgress, IconButton, InputBase, Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { supabase } from '../lib/supabase'

// ── Supabase 연결 실패 시 대체 데이터 ──────────────────────────
const FALLBACK_STOPS = [
  { stop_id: '40418', stop_name: '현대백화점사거리',   direction: '좋은의사들안과병원 방면' },
  { stop_id: '10506', stop_name: '병영사거리',         direction: '중구보건소 방면' },
  { stop_id: '22419', stop_name: '대공원호반베르디움', direction: '산학융합지구캠퍼스 방면' },
  { stop_id: '10100', stop_name: '울산역',             direction: '신복로터리 방면' },
  { stop_id: '10200', stop_name: '태화강역',           direction: '공업탑 방면' },
  { stop_id: '10300', stop_name: '공업탑로터리',       direction: '남구청 방면' },
  { stop_id: '40344', stop_name: '명촌차고지',         direction: '태화강역 방면' },
  { stop_id: '40346', stop_name: '태화강역(2번 정류소)', direction: '이마트 방면' },
  { stop_id: '40354', stop_name: '울산대학교정문',     direction: '문수 방면' },
  { stop_id: '40357', stop_name: '울산과학기술원',     direction: 'UNIST 방면' },
  { stop_id: '50100', stop_name: '언양공용터미널',     direction: '울산역 방면' },
  { stop_id: '20100', stop_name: '삼산동',             direction: '태화강역 방면' },
]

const FALLBACK_ROUTES = [
  { route_number: '127',  route_type: '일반', interval_minutes: 15, start_point: '울산역(기점)',         end_point: '신복로터리(종점)'     },
  { route_number: '492',  route_type: '순환', interval_minutes: 20, start_point: '울산역(기점)',         end_point: '울산역(종점)'         },
  { route_number: '512',  route_type: '일반', interval_minutes: 30, start_point: '삼산동(기점)',         end_point: '울산역(종점)'         },
  { route_number: '743',  route_type: '일반', interval_minutes: 45, start_point: '명촌차고지(기점)',     end_point: '울산과학기술원(종점)' },
  { route_number: '753',  route_type: '일반', interval_minutes: 45, start_point: '명촌차고지(기점)',     end_point: '울산과학기술원(종점)' },
  { route_number: '1002', route_type: '좌석', interval_minutes: 60, start_point: '언양공용터미널(기점)', end_point: '울산역(종점)'         },
]

const TYPE_COLORS = {
  일반: { bg: '#E8F0FB', text: '#2D6CDF' },
  순환: { bg: '#E0F5F5', text: '#00A8A8' },
  좌석: { bg: '#FFF0EA', text: '#FF6B35' },
}

function BadgeInline({ type }) {
  const col = TYPE_COLORS[type] || TYPE_COLORS['일반']
  return (
    <Box
      component="span"
      sx={{
        px: 0.75, py: 0.2,
        borderRadius: 1,
        fontSize: '11px', fontWeight: 600,
        bgcolor: col.bg, color: col.text,
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
  const [allStops, setAllStops] = useState([])
  const [allRoutes, setAllRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [stopsRes, routesRes] = await Promise.all([
          supabase.from('stops').select('*').order('stop_name'),
          supabase.from('routes').select('*').order('route_number'),
        ])
        setAllStops(stopsRes.data?.length ? stopsRes.data : FALLBACK_STOPS)
        setAllRoutes(routesRes.data?.length ? routesRes.data : FALLBACK_ROUTES)
      } catch {
        setAllStops(FALLBACK_STOPS)
        setAllRoutes(FALLBACK_ROUTES)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredStops = useMemo(() => {
    if (!query) return allStops
    const q = query.toLowerCase()
    return allStops.filter(
      (s) =>
        s.stop_name.toLowerCase().includes(q) ||
        s.stop_id.includes(q) ||
        (s.direction || '').includes(q)
    )
  }, [allStops, query])

  const filteredRoutes = useMemo(() => {
    if (!query) return allRoutes
    const q = query.toLowerCase()
    return allRoutes.filter(
      (r) =>
        r.route_number.includes(q) ||
        r.route_type.includes(q) ||
        (r.start_point || '').includes(q) ||
        (r.end_point || '').includes(q)
    )
  }, [allRoutes, query])

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
            placeholder={tab === 'stops' ? '정류장명 또는 정류장번호로 검색' : '노선번호 또는 방면으로 검색'}
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

      {/* 결과 */}
      <Box sx={{ px: '24px' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={28} />
          </Box>
        ) : tab === 'stops' ? (
          filteredStops.length === 0 ? (
            <Typography sx={{ py: 4, textAlign: 'center', color: 'text.disabled', fontSize: '14px' }}>
              검색 결과가 없습니다
            </Typography>
          ) : (
            filteredStops.map((stop, idx) => (
              <Box
                key={stop.id || idx}
                sx={{
                  py: 1.75,
                  borderBottom: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F8F9FA', mx: '-24px', px: '24px' },
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
                <ArrowForwardIosIcon sx={{ fontSize: 12, color: 'text.disabled', flexShrink: 0, ml: 1 }} />
              </Box>
            ))
          )
        ) : (
          filteredRoutes.length === 0 ? (
            <Typography sx={{ py: 4, textAlign: 'center', color: 'text.disabled', fontSize: '14px' }}>
              검색 결과가 없습니다
            </Typography>
          ) : (
            filteredRoutes.map((route, idx) => (
              <Box
                key={route.id || idx}
                onClick={() => navigate(`/routes/${route.route_number}`)}
                sx={{
                  py: 1.75,
                  borderBottom: '1px solid', borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F8F9FA', mx: '-24px', px: '24px' },
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
                    <Typography variant="caption" color="text.secondary">
                      {route.start_point}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">→</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {route.end_point}
                    </Typography>
                  </Box>
                </Box>
                <ArrowForwardIosIcon sx={{ fontSize: 12, color: 'text.disabled', flexShrink: 0, ml: 1 }} />
              </Box>
            ))
          )
        )}
      </Box>
    </Box>
  )
}

export default StopSearchPage
