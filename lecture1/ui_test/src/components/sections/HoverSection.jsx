import { Box, Typography, Stack, Paper } from '@mui/material'

const HOVER_CARDS = [
  {
    label: '색상 변화',
    desc: 'hover 시 배경색 전환',
    sx: {
      bgcolor: 'primary.main',
      color: 'white',
      transition: 'background-color 0.3s',
      '&:hover': { bgcolor: 'secondary.main' },
    },
  },
  {
    label: '크기 변화',
    desc: 'hover 시 확대',
    sx: {
      bgcolor: 'grey.200',
      transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.1)' },
    },
  },
  {
    label: '그림자 효과',
    desc: 'hover 시 그림자 강조',
    sx: {
      bgcolor: 'background.paper',
      boxShadow: 1,
      transition: 'box-shadow 0.3s',
      '&:hover': { boxShadow: 8 },
    },
  },
  {
    label: '테두리 효과',
    desc: 'hover 시 테두리 표시',
    sx: {
      bgcolor: 'background.paper',
      border: '2px solid transparent',
      transition: 'border-color 0.3s',
      '&:hover': { borderColor: 'primary.main' },
    },
  },
  {
    label: '투명도 변화',
    desc: 'hover 시 밝아짐',
    sx: {
      bgcolor: 'success.main',
      color: 'white',
      opacity: 0.5,
      transition: 'opacity 0.3s',
      '&:hover': { opacity: 1 },
    },
  },
  {
    label: '위로 이동',
    desc: 'hover 시 위로 떠오름',
    sx: {
      bgcolor: 'warning.main',
      color: 'white',
      boxShadow: 2,
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
    },
  },
]

function HoverSection() {
  return (
    <Box sx={{ mb: 6 }}>
<Typography variant="h6" sx={{ mb: 2 }}>호버 효과 카드</Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {HOVER_CARDS.map((card) => (
          <Paper
            key={card.label}
            sx={{
              width: 160,
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              cursor: 'pointer',
              ...card.sx,
            }}
          >
            <Typography variant="h6" align="center">{card.label}</Typography>
            <Typography variant="caption" align="center" sx={{ px: 1 }}>{card.desc}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}

export default HoverSection
