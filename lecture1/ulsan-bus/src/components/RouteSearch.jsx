import { Box, IconButton, Typography } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { useState } from 'react'

function RouteSearch() {
  const [departure] = useState('현위치: 울산 중구 성남동 256-24')
  const [destination, setDestination] = useState('')

  return (
    <Box
      sx={{
        mx: 2,
        my: 2,
        p: 2,
        borderRadius: '8px',
        background:
          'linear-gradient(white, white) padding-box, linear-gradient(135deg, #1565C0, #7B1FA2) border-box',
        border: '2px solid transparent',
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <RadioButtonCheckedIcon sx={{ color: '#1565C0', mr: 1, fontSize: 18 }} />
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          {departure}
        </Typography>
      </Box>
      <Box
        sx={{
          height: '1px',
          bgcolor: 'divider',
          mx: 3.5,
          mb: 1.5,
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ color: '#C62828', mr: 1, fontSize: 18 }} />
        <Box
          component="input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="도착지를 입력하세요"
          sx={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.875rem',
            color: destination ? 'text.primary' : 'text.disabled',
            bgcolor: 'transparent',
            fontFamily: 'inherit',
            '&::placeholder': { color: 'text.disabled' },
          }}
        />
      </Box>
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'text.secondary',
        }}
      >
        <SwapVertIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default RouteSearch
