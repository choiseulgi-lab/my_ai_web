import { Box, Typography } from '@mui/material'

const events = [
  {
    bg: 'linear-gradient(155deg, #1a2d3e 0%, #0d1525 100%)',
    title: '재봄주 할인쿠폰 이벤트',
    date: '~6.20(금)',
  },
  {
    bg: 'linear-gradient(155deg, #1a1a2e 0%, #0d0d20 100%)',
    title: '"악마는 프라다를 입는다 2" N차 관람 이벤트, 구매인증 하고 오즈쏜자',
    date: '~6.30(월)',
  },
  {
    bg: 'linear-gradient(155deg, #2d2520 0%, #1a1510 100%)',
    title: '"아이론선" 개봉 이벤트. 사진찍어보고 끝날쿠폰 받자',
    date: '~6.30(월)',
  },
]

function EventSection() {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', py: 7 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', letterSpacing: 1, mb: 4 }}>
          EVENT
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          {events.map((event, i) => (
            <Box key={i} sx={{ flex: 1, cursor: 'pointer' }}>
              <Box sx={{
                height: 200, borderRadius: 1, background: event.bg, mb: 1.5,
                display: 'flex', alignItems: 'flex-end', p: 2.5, overflow: 'hidden',
                transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 },
              }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '3.5rem', fontWeight: 900, lineHeight: 0.9, userSelect: 'none' }}>
                  {i + 1}
                </Typography>
              </Box>
              <Typography sx={{ color: '#ccc', fontSize: '0.82rem', lineHeight: 1.55, mb: 0.5 }}>
                {event.title}
              </Typography>
              <Typography sx={{ color: '#555', fontSize: '0.73rem' }}>
                ● {event.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default EventSection
