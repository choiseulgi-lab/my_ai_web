import { useState } from 'react'
import { Box, TextField, Typography, Stack, Divider, Paper } from '@mui/material'

function InputSection() {
  const [standardValue, setStandardValue] = useState('')
  const [outlinedValue, setOutlinedValue] = useState('')
  const [filledValue, setFilledValue] = useState('')

  return (
    <Box sx={{ mb: 6 }}>
<Typography variant="h6" sx={{ mb: 2 }}>Variant</Typography>
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <TextField
          label="Standard"
          variant="standard"
          placeholder="텍스트를 입력하세요"
          value={standardValue}
          onChange={(e) => setStandardValue(e.target.value)}
        />
        <TextField
          label="Outlined"
          variant="outlined"
          placeholder="텍스트를 입력하세요"
          value={outlinedValue}
          onChange={(e) => setOutlinedValue(e.target.value)}
        />
        <TextField
          label="Filled"
          variant="filled"
          placeholder="텍스트를 입력하세요"
          value={filledValue}
          onChange={(e) => setFilledValue(e.target.value)}
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>입력값 실시간 표시</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Standard: <strong>{standardValue || '(없음)'}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Outlined: <strong>{outlinedValue || '(없음)'}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filled: <strong>{filledValue || '(없음)'}</strong>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default InputSection
