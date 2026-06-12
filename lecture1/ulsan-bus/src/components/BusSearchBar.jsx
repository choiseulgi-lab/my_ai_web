import { Box, InputBase, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

function BusSearchBar() {
  const [query, setQuery] = useState('')

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: '12px' }}>
        버스 검색
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          px: 1.5,
          py: 0.75,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SearchIcon sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} />
        <InputBase
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="정류장명, 정류장번호 또는 버스번호를 검색하세요"
          sx={{
            fontSize: '0.8125rem',
            color: 'text.primary',
            '& input::placeholder': { color: 'text.disabled', opacity: 1 },
          }}
        />
      </Box>
    </Box>
  )
}

export default BusSearchBar
