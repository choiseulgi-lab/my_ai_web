import { Box, Typography, Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import StarIcon from '@mui/icons-material/Star'

const BASE_W = 'https://image.tmdb.org/t/p/w1280'
const BASE_S  = 'https://image.tmdb.org/t/p/w780'

const MAIN_BACKDROP = `${BASE_W}/edVIvTc8RofOTxoAZN7a5kxIAay.jpg`

const trailers = [
  { label: '1차 예고편', img: `${BASE_S}/9auiAwo3ZVBoyGB6b41BPEXkzG7.jpg` },
  { label: '2차 예고편', img: `${BASE_S}/u0pvmpa4iUbVm6QqR4MRLwnaYOe.jpg` },
  { label: '3차 예고편', img: `${BASE_S}/azJBbPQiA2iM5yxIxzeIIxffvNF.jpg` },
]

function NewMovie() {
  return (
    <Box sx={{ bgcolor: '#0d0d0d', pt: 5, pb: 0 }}>
      {/* 섹션 헤더 */}
      <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 5 }, mb: 3 }}>
        <Typography sx={{ color: '#E8000D', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 3, mb: 0.5 }}>
          NEW MOVIE
        </Typography>
        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.35rem' }}>
          오늘의 추천 신작
        </Typography>
      </Box>

      {/* 메인 콘텐츠 영역 — 1600×778 */}
      <Box sx={{
        maxWidth: 1600, mx: 'auto',
        height: 778,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* ── 좌측: 배경 스틸 + 텍스트 오버레이 ── */}
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* 배경 이미지 */}
          <Box
            component="img"
            src={MAIN_BACKDROP}
            alt="살목지"
            sx={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          {/* 좌측 그라데이션 (텍스트 가독성) */}
          <Box sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)',
          }} />
          {/* 하단 그라데이션 */}
          <Box sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 35%)',
          }} />

          {/* 텍스트 콘텐츠 */}
          <Box sx={{
            position: 'relative', zIndex: 1,
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            px: { xs: 4, md: 7 }, maxWidth: 560,
          }}>
            {/* 제목 */}
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '2.6rem', lineHeight: 1.2, mb: 1 }}>
              살목지
            </Typography>

            {/* 장르/국가/상영시간 */}
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', mb: 0.6 }}>
              공포/대한민국 · 95분
            </Typography>

            {/* 별점 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2.5 }}>
              <StarIcon sx={{ color: '#f5c518', fontSize: '0.95rem' }} />
              <Typography sx={{ color: '#fff', fontSize: '0.88rem' }}>
                8.33 (3,801)
              </Typography>
            </Box>

            {/* 출연 */}
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', mb: 2 }}>
              출연: 김혜윤, 이종원, 김준한
            </Typography>

            {/* 줄거리 */}
            <Typography sx={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem',
              lineHeight: 1.85, mb: 3.5,
            }}>
              기이한 소문이 끊이지 않는 저수지 살목지의 로드뷰 화면에<br />
              촬영된 적 없는 정체불명의 형체가 포착된다.<br />
              오늘 안에 반드시 재촬영을 끝내야 하는 상황 속에<br />
              살목지로 찾아온 PD '수인'(김혜윤)과 촬영팀...
            </Typography>

            {/* 예매하기 버튼 */}
            <Button variant="outlined" sx={{
              alignSelf: 'flex-start', px: 3.5, py: 1.1,
              color: '#fff', borderColor: 'rgba(255,255,255,0.7)', borderRadius: '4px',
              fontWeight: 700, fontSize: '0.88rem',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#fff' },
            }}>
              예매하기 →
            </Button>
          </Box>
        </Box>

        {/* ── 우측: 예고편 썸네일 3개 ── */}
        <Box sx={{
          width: 300,
          bgcolor: '#0d0d0d',
          display: 'flex', flexDirection: 'column',
          gap: 1, p: 1.5,
        }}>
          {trailers.map((t, i) => (
            <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {/* 썸네일 이미지 */}
              <Box sx={{
                flex: 1, position: 'relative', overflow: 'hidden',
                borderRadius: '6px', cursor: 'pointer',
                '&:hover .arrow-btn': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}>
                <Box
                  component="img"
                  src={t.img}
                  alt={t.label}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* 어두운 오버레이 */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  bgcolor: 'rgba(0,0,0,0.38)',
                }} />
                {/* 원형 화살표 버튼 */}
                <Box className="arrow-btn" sx={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 44, height: 44, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.85)',
                  bgcolor: 'rgba(0,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'bgcolor 0.2s',
                }}>
                  <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: '1rem', ml: 0.3 }} />
                </Box>
              </Box>
              {/* 레이블 */}
              <Typography sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.75rem', fontWeight: 500, pl: 0.5,
              }}>
                {t.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default NewMovie
