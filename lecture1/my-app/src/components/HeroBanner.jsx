import { Box, Typography, Button } from '@mui/material'

const BACKDROP = 'https://image.tmdb.org/t/p/original/y3fQa7pytlysovXzovpXc1OQlTW.jpg'

function HeroBanner() {
  return (
    <Box sx={{ position: 'relative', height: { xs: 280, md: 480 }, overflow: 'hidden', bgcolor: '#111' }}>
      {/* 배경 이미지 */}
      <Box
        component="img"
        src={BACKDROP}
        alt="악마는 프라다를 입는다 2"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      {/* 텍스트 가독성용 좌측 그라데이션 */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)',
      }} />
      {/* 하단 그라데이션 */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 40%)',
      }} />

      {/* 컨텐츠 */}
      <Box sx={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', alignItems: 'flex-end',
        maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 5 }, pb: { xs: 4, md: 7 },
      }}>
        <Box>
          <Typography sx={{ color: '#E8000D', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 3, mb: 1, display: 'block' }}>
            NOW SHOWING
          </Typography>
          <Typography sx={{
            color: '#fff', fontWeight: 800, lineHeight: 1.2, mb: 1.5,
            fontSize: { xs: '1.6rem', md: '2.5rem' },
          }}>
            악마는 프라다를 입는다
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.83rem', lineHeight: 1.8, mb: 3 }}>
            메릴 스트립, 앤 해서웨이, 에밀리 블런트, 스탠리 투치.<br />
            꿈 제국을 열심히 '런웨이'에 전설들과 함께!
          </Typography>
          <Button variant="contained" sx={{
            bgcolor: '#E8000D', '&:hover': { bgcolor: '#c00000' },
            borderRadius: 0, px: 3, py: 1, fontWeight: 700, fontSize: '0.88rem',
          }}>
            예매하기 →
          </Button>
        </Box>
      </Box>

      {/* 슬라이드 인디케이터 */}
      <Box sx={{ position: 'absolute', bottom: 18, right: 24, zIndex: 2, display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <Box key={i} sx={{
            width: i === 0 ? 22 : 7, height: 2,
            bgcolor: i === 0 ? '#E8000D' : 'rgba(255,255,255,0.35)',
            borderRadius: 1,
          }} />
        ))}
      </Box>
    </Box>
  )
}

export default HeroBanner
