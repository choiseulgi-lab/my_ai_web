import { Box } from '@mui/material'

const TYPE_COLORS = {
  일반: { bg: '#E3F2FD', text: '#1565C0' },
  순환: { bg: '#E8F5E9', text: '#2E7D32' },
  좌석: { bg: '#FFEBEE', text: '#C62828' },
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
