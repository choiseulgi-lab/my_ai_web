import { useState } from 'react'
import { Box, Button, Typography, Stack, Divider, Paper, Fade, Grow, Slide } from '@mui/material'

const bounceKeyframes = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`

function AnimationSection() {
  const [fadeIn, setFadeIn] = useState(false)
  const [growIn, setGrowIn] = useState(false)
  const [slideIn, setSlideIn] = useState(false)
  const [bouncing, setBouncing] = useState(false)

  const handleBounce = () => {
    setBouncing(false)
    setTimeout(() => setBouncing(true), 10)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <style>{bounceKeyframes}</style>
      <Typography variant="h2" sx={{ mb: 3 }}>Animation</Typography>

      {/* Fade */}
      <Typography variant="h6" sx={{ mb: 1 }}>Fade</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => setFadeIn((prev) => !prev)}>
          {fadeIn ? 'Hide' : 'Show'} Fade
        </Button>
        <Fade in={fadeIn} timeout={600}>
          <Paper sx={{ px: 3, py: 1.5, bgcolor: 'primary.main' }}>
            <Typography color="white">Fade 효과</Typography>
          </Paper>
        </Fade>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Grow */}
      <Typography variant="h6" sx={{ mb: 1 }}>Grow</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => setGrowIn((prev) => !prev)}>
          {growIn ? 'Hide' : 'Show'} Grow
        </Button>
        <Grow in={growIn} timeout={500}>
          <Paper sx={{ px: 3, py: 1.5, bgcolor: 'secondary.main' }}>
            <Typography color="white">Grow 효과</Typography>
          </Paper>
        </Grow>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Slide */}
      <Typography variant="h6" sx={{ mb: 1 }}>Slide</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, overflow: 'hidden' }}>
        <Button variant="outlined" onClick={() => setSlideIn((prev) => !prev)}>
          {slideIn ? 'Hide' : 'Show'} Slide
        </Button>
        <Slide in={slideIn} direction="right" timeout={400}>
          <Paper sx={{ px: 3, py: 1.5, bgcolor: 'success.main' }}>
            <Typography color="white">Slide 효과</Typography>
          </Paper>
        </Slide>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* CSS Bounce */}
      <Typography variant="h6" sx={{ mb: 1 }}>CSS Bounce</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="outlined" onClick={handleBounce}>
          Bounce!
        </Button>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            animation: bouncing ? 'bounce 0.6s ease 3' : 'none',
          }}
          onAnimationEnd={() => setBouncing(false)}
        />
      </Stack>
    </Box>
  )
}

export default AnimationSection
