import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Box, Button, Typography, Stack, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const SLIDES = [
  { label: 'Slide 1', color: '#1976d2' },
  { label: 'Slide 2', color: '#dc004e' },
  { label: 'Slide 3', color: '#2e7d32' },
  { label: 'Slide 4', color: '#ed6c02' },
  { label: 'Slide 5', color: '#7b1fa2' },
]

function SwipeSection() {
  const [index, setIndex] = useState(0)

  const goPrev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  const goNext = () => setIndex((prev) => (prev + 1) % SLIDES.length)

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
  })

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Swipe</Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>이미지 슬라이더 (스와이프 / 버튼)</Typography>

      {/* 슬라이드 영역 */}
      <Box
        {...handlers}
        sx={{
          position: 'relative',
          height: 240,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: SLIDES[index].color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          userSelect: 'none',
          transition: 'background-color 0.4s',
        }}
      >
        <Typography variant="h3" color="white">{SLIDES[index].label}</Typography>

        {/* 이전 버튼 */}
        <IconButton
          onClick={goPrev}
          sx={{ position: 'absolute', left: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* 다음 버튼 */}
        <IconButton
          onClick={goNext}
          sx={{ position: 'absolute', right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* 인덱스 표시 */}
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        {SLIDES.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 24 : 10,
              height: 10,
              borderRadius: 5,
              bgcolor: i === index ? 'primary.main' : 'grey.400',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </Stack>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        {index + 1} / {SLIDES.length} · 좌우로 스와이프하거나 버튼을 클릭하세요
      </Typography>
    </Box>
  )
}

export default SwipeSection
