import { Box } from '@mui/material'

const TYPE_COLORS = {
  일반: { bg: '#E8F0FB', text: '#2D6CDF' },
  순환: { bg: '#E0F5F5', text: '#00A8A8' },
  좌석: { bg: '#FFF0EA', text: '#FF6B35' },
  급행: { bg: '#FFF3E0', text: '#E65100' },
}

function BusTypeBadge({ type = '일반' }) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS['일반']

  return (
    <Box
      component="span"
      sx={{
        px: 0.75,
        py: 0.25,
        borderRadius: 1,
        fontSize: '0.6875rem',
        fontWeight: 600,
        bgcolor: colors.bg,
        color: colors.text,
        ml: 0.5,
        lineHeight: 1.4,
      }}
    >
      {type}
    </Box>
  )
}

export default BusTypeBadge
