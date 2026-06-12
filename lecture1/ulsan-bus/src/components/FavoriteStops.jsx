import { Box, Card, CircularProgress, IconButton, Typography } from '@mui/material'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SEED_STOPS = [
  { stop_id: '40418', stop_name: '현대백화점사거리', direction: '좋은의사들안과병원 방면' },
  { stop_id: '10506', stop_name: '병영사거리', direction: '중구보건소 방면' },
  { stop_id: '22419', stop_name: '대공원호반베르디움', direction: '산학융합지구캠퍼스 방면' },
]

function FavoriteStops() {
  const [stops, setStops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStops()
  }, [])

  async function loadStops() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('favorite_stops')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setStops(data?.length ? data : SEED_STOPS)
    } catch {
      setStops(SEED_STOPS)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleFavorite(stop) {
    const exists = stops.find((s) => s.stop_id === stop.stop_id && s.id)
    if (exists) {
      await supabase.from('favorite_stops').delete().eq('id', exists.id)
    } else {
      await supabase.from('favorite_stops').insert({
        stop_id: stop.stop_id,
        stop_name: stop.stop_name,
        direction: stop.direction,
      })
    }
    loadStops()
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
          <DirectionsBusOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h3" color="primary.main">
            정류장 찾기
          </Typography>
        </Box>
        <ChevronRightIcon sx={{ color: 'primary.main' }} />
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, pl: '52px' }}>
          {stops.map((stop, idx) => (
            <Box
              key={stop.id || idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
                borderBottom: idx < stops.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
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
              <IconButton size="small" onClick={() => handleToggleFavorite(stop)}>
                {stop.id ? (
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

export default FavoriteStops
