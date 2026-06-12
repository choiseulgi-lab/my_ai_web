import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { supabase } from '../lib/supabase'

// Supabase 컬럼 'green'|'yellow'|'red' → hex
const COLOR = { green: '#4CAF50', yellow: '#FFC107', red: '#F44336' }
const c = (key) => (key ? COLOR[key] || '#4CAF50' : null)

// Supabase 연결 실패 시 사용하는 정적 대체 데이터
const FALLBACK = {
  '753': {
    route: { route_number: '753', route_type: '일반', interval_minutes: 45, start_point: '명촌차고지(기점)', end_point: '울산과학기술원(종점)', forward_count: 5, backward_count: 3 },
    stops: [
      { stop_name: '명촌차고지(기점)',       stop_id: '40344', stop_type: 'bus',   dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '평창리비에르아파트앞',   stop_id: '40345', stop_type: 'small', dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '태화강역(2번 정류소)',   stop_id: '40346', stop_type: 'small', dot_color: 'green',  line_color_below: 'yellow' },
      { stop_name: '이마트앞, 울산통계청',  stop_id: '40347', stop_type: 'bus',   dot_color: 'red',    line_color_below: 'red'    },
      { stop_name: '농수산물도매시장앞',     stop_id: '40348', stop_type: 'small', dot_color: 'red',    line_color_below: 'red'    },
      { stop_name: '롯데백화점울산점앞',     stop_id: '40349', stop_type: 'small', dot_color: 'red',    line_color_below: 'yellow' },
      { stop_name: '공업탑로터리',           stop_id: '10300', stop_type: 'bus',   dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '남구청앞',               stop_id: '40350', stop_type: 'small', dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '신정시장앞',             stop_id: '40351', stop_type: 'small', dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '무거교차로',             stop_id: '40352', stop_type: 'small', dot_color: 'green',  line_color_below: 'yellow' },
      { stop_name: '옥동아파트앞',           stop_id: '40353', stop_type: 'bus',   dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '울산대학교정문',         stop_id: '40354', stop_type: 'small', dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '문수스타디움앞',         stop_id: '40355', stop_type: 'small', dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '울산과학기술원입구',     stop_id: '40356', stop_type: 'bus',   dot_color: 'green',  line_color_below: 'green'  },
      { stop_name: '울산과학기술원(종점)',   stop_id: '40357', stop_type: 'small', dot_color: 'green',  line_color_below: null     },
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
  const [route, setRoute] = useState(null)
  const [stops, setStops] = useState([])
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState('forward')
  const [starred, setStarred] = useState(false)

  useEffect(() => {
    loadData()
  }, [routeNumber])

  async function loadData() {
    setLoading(true)
    try {
      const [{ data: routeArr, error: re }, { data: sd, error: se }] = await Promise.all([
        supabase.from('routes').select('*').eq('route_number', routeNumber),
        supabase.from('route_stops').select('*').eq('route_number', routeNumber).order('sequence'),
      ])
      if (re) throw re
      if (se) throw se
      const rd = routeArr?.[0]
      if (!rd) throw new Error('no route')
      setRoute(rd)
      setStops(sd || [])
    } catch {
      const fb = FALLBACK[routeNumber] || FALLBACK['753']
      setRoute(fb.route)
      setStops(fb.stops)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!route) return null

  const colors = TYPE_COLORS[route.route_type] || TYPE_COLORS['일반']
  const displayStops = direction === 'forward' ? stops : [...stops].reverse()

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ px: '24px', pt: 2 }}>

        {/* 노선 카드 */}
        <Box
          sx={{
            p: '16px',
            mb: 2,
            borderRadius: '8px',
            background:
              'linear-gradient(white, white) padding-box, linear-gradient(to right, #1565C0, #E91E8C) border-box',
            border: '2px solid transparent',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ fontSize: '26px', fontWeight: 700, color: 'text.primary' }}>
              {route.route_number}
            </Typography>
            <Box
              onClick={() => setStarred(!starred)}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {starred
                ? <StarIcon sx={{ color: '#FFC107', fontSize: 22 }} />
                : <StarBorderIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
              }
            </Box>
          </Box>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 0.5 }}>
            {route.route_type} · 배차 {route.interval_minutes}분
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
              {route.start_point}
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
              {route.end_point}
            </Typography>
          </Box>
        </Box>

        {/* 정방향 / 역방향 토글 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          {[
            { key: 'forward',  label: `정방향 (${route.forward_count}대운행)` },
            { key: 'backward', label: `역방향 (${route.backward_count}대운행)` },
          ].map(({ key, label }) => (
            <Box
              key={key}
              onClick={() => setDirection(key)}
              sx={{
                flex: 1,
                py: '10px',
                textAlign: 'center',
                borderRadius: '20px',
                border: '1.5px solid',
                borderColor: direction === key ? 'text.primary' : 'divider',
                bgcolor: 'background.paper',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: direction === key ? 600 : 400,
                  color: direction === key ? 'text.primary' : 'text.disabled',
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 운행시간 정보 */}
        <Box
          sx={{
            mb: 3,
            py: '13px',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'text.primary' }}>
            운행시간 정보
          </Typography>
        </Box>

        {/* 정류장 타임라인 */}
        <Box sx={{ pb: 4 }}>
          {displayStops.map((stop, idx) => {
            const isFirst = idx === 0
            const isLast = idx === displayStops.length - 1
            const topColor = idx > 0
              ? (c(displayStops[idx - 1].line_color_below) || 'transparent')
              : 'transparent'
            const bottomColor = !isLast
              ? (c(stop.line_color_below) || 'transparent')
              : 'transparent'
            const isBus = stop.stop_type === 'bus'
            const dotColor = c(stop.dot_color) || '#4CAF50'
            const dotSize = isBus ? 28 : 10

            return (
              <Box key={idx} sx={{ display: 'flex', minHeight: isBus ? 62 : 50 }}>

                {/* 타임라인 열 — flex column으로 위 라인 / 도트 / 아래 라인 배치 */}
                <Box
                  sx={{
                    width: 36,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* 위 라인 */}
                  <Box
                    style={{ width: 3, flex: 1, backgroundColor: topColor }}
                  />
                  {/* 도트 */}
                  <Box
                    sx={{
                      width: dotSize,
                      height: dotSize,
                      flexShrink: 0,
                      borderRadius: '50%',
                      border: `2px solid ${dotColor}`,
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isBus && (
                      <DirectionsBusIcon style={{ fontSize: 14, color: dotColor }} />
                    )}
                  </Box>
                  {/* 아래 라인 */}
                  <Box
                    style={{ width: 3, flex: 1, backgroundColor: bottomColor }}
                  />
                </Box>

                {/* 정류장 텍스트 */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pl: '14px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: isFirst || isLast ? 600 : 400,
                      color: 'text.primary',
                      lineHeight: 1.3,
                    }}
                  >
                    {stop.stop_name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
                    ({stop.stop_id})
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
