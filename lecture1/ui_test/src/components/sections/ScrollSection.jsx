import { Box, Paper, Typography, Divider } from '@mui/material'

const ITEMS = Array.from({ length: 20 }, (_, i) => `아이템 ${i + 1}`)

function ScrollSection() {
  return (
    <Box sx={{ mb: 6 }}>
<Typography variant="h6" sx={{ mb: 2 }}>스크롤 가능 영역 (300px)</Typography>
      <Paper
        variant="outlined"
        sx={{ height: 300, overflowY: 'auto', p: 2 }}
      >
        {ITEMS.map((item, index) => (
          <Box key={item}>
            <Typography variant="body1" sx={{ py: 1 }}>
              {item}
            </Typography>
            {index < ITEMS.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

export default ScrollSection
