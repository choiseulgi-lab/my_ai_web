import { useState } from 'react'
import { Box, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Paper, Stack } from '@mui/material'

const FRUITS = ['사과', '바나나', '딸기', '포도', '수박']
const CITIES = ['서울', '부산', '대구', '인천', '광주']

function DropdownSection() {
  const [fruit, setFruit] = useState('')
  const [city, setCity] = useState('')

  return (
    <Box sx={{ mb: 6 }}>
<Typography variant="h6" sx={{ mb: 2 }}>Select</Typography>
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>과일 선택</InputLabel>
          <Select
            value={fruit}
            label="과일 선택"
            onChange={(e) => setFruit(e.target.value)}
          >
            {FRUITS.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>도시 선택</InputLabel>
          <Select
            value={city}
            label="도시 선택"
            onChange={(e) => setCity(e.target.value)}
          >
            {CITIES.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>선택값 실시간 표시</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            과일: <strong>{fruit || '(선택 안 됨)'}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            도시: <strong>{city || '(선택 안 됨)'}</strong>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default DropdownSection
