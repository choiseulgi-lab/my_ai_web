import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { RATING_LABELS } from '../../constants'

function RatingStars({ value, onChange, readOnly = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          onClick={() => !readOnly && onChange?.(star)}
          sx={{ cursor: readOnly ? 'default' : 'pointer' }}
        >
          {star <= value
            ? <StarIcon sx={{ color: '#ffc107', fontSize: readOnly ? 18 : 28 }} />
            : <StarBorderIcon sx={{ color: '#ffc107', fontSize: readOnly ? 18 : 28 }} />
          }
        </Box>
      ))}
      {!readOnly && value > 0 && (
        <Typography variant="body2" color="text.secondary" ml={0.5}>
          {RATING_LABELS[value]}
        </Typography>
      )}
    </Box>
  )
}

export default RatingStars
