import { Box, Card, CircularProgress, IconButton, Typography } from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import BusTypeBadge from './BusTypeBadge'

const SEED_ROUTES = [
  {
    route_number: '753',
    route_type: '일반',
    interval_minutes: 45,
    start_point: '명촌차고지(기점)',
    end_point: '울산과학기술원(종점)',
  },
  {
    route_number: '743',
    route_type: '일반',
    interval_minutes: 45,
    start_point: '명촌차고지(기점)',
    end_point: '울산과학기술원(종점)',
  },
  {
    route_number: '492',
    route_type: '순환',
    interval_minutes: 20,
    start_point: '울산역(기점)',
    end_point: '울산역(종점)',
  },
]

function FavoriteRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoutes()
  }, [])

  async function loadRoutes() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('favorite_routes')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setRoutes(data?.length ? data : SEED_ROUTES)
    } catch {
      setRoutes(SEED_ROUTES)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleFavorite(route) {
    const exists = routes.find((r) => r.route_number === route.route_number && r.id)
    if (exists) {
      await supabase.from('favorite_routes').delete().eq('id', exists.id)
    } else {
      await supabase.from('favorite_routes').insert({
        route_number: route.route_number,
        route_type: route.route_type,
        interval_minutes: route.interval_minutes,
        start_point: route.start_point,
        end_point: route.end_point,
      })
    }
    loadRoutes()
  }

  return (
    <Box>
      <Card
        sx={{
          p: 2,
          mb: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1.5px solid',
          borderColor: 'primary.main',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'primary.50' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DirectionsBusIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h3" color="primary.main">
            노선찾기
          </Typography>
        </Box>
        <ChevronRightIcon sx={{ color: 'primary.main' }} />
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {routes.map((route, idx) => (
            <Box
              key={route.id || idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
                borderBottom: idx < routes.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.25 }}>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}
                  >
                    {route.route_number}
                  </Typography>
                  <BusTypeBadge type={route.route_type} />
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    · 배차 {route.interval_minutes}분
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {route.start_point}
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {route.end_point}
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small" onClick={() => handleToggleFavorite(route)}>
                {route.id ? (
                  <StarIcon sx={{ color: '#FFC107', fontSize: 22 }} />
                ) : (
                  <StarBorderIcon sx={{ color: '#FFC107', fontSize: 22 }} />
                )}
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default FavoriteRoutes
