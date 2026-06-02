import { Box, Typography, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

const BASE = 'https://image.tmdb.org/t/p/w500'

const movies = [
  {
    dday: 'D-7',  title: '군체', genre: '액션/공포', country: '한국', runtime: '118분',
    rating: '15', reservationRate: '12.4%', stars: '8.10', reviews: '842',
    poster: `${BASE}/thK6glS5pklrlijsgSN6Hw9GLQK.jpg`,
  },
  {
    dday: 'D-7',  title: '한 적 없는 남자', genre: '드라마', country: '한국', runtime: '102분',
    rating: '12', reservationRate: '6.1%', stars: '7.88', reviews: '531',
    poster: `${BASE}/otP94vckeMXAgQxzhcRkZSeSmYv.jpg`,
  },
  {
    dday: 'D-13', title: '휴민트', genre: '스릴러', country: '한국', runtime: '134분',
    rating: '15', reservationRate: '9.3%', stars: '8.42', reviews: '1,203',
    poster: `${BASE}/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg`,
  },
  {
    dday: 'D-13', title: '군체', genre: '액션/공포', country: '한국', runtime: '118분',
    rating: '15', reservationRate: '12.4%', stars: '8.10', reviews: '842',
    poster: `${BASE}/lwSSlNNZbtiyYRAqSa53cgYNfVQ.jpg`,
  },
]

function ComingCard({ movie }) {
  return (
    <Box sx={{ width: 382, flexShrink: 0 }}>
      {/* 포스터 영역 */}
      <Box sx={{ position: 'relative', height: 460, overflow: 'hidden', borderRadius: '8px 8px 0 0', bgcolor: '#222' }}>
        <Box
          component="img"
          src={movie.poster}
          alt={movie.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* D-day 배지 */}
        <Box sx={{
          position: 'absolute', top: 14, left: 14,
          background: 'linear-gradient(135deg, #f5a623 0%, #e8870d 100%)',
          borderRadius: '8px', px: 1.5, py: 0.8,
        }}>
          <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', lineHeight: 1 }}>
            {movie.dday}
          </Typography>
        </Box>
        {/* 관람등급 */}
        <Box sx={{
          position: 'absolute', bottom: 12, right: 12,
          bgcolor: '#f5a623', borderRadius: '6px', px: 1, py: 0.4, minWidth: 32, textAlign: 'center',
        }}>
          <Typography sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.4 }}>
            {movie.rating}
          </Typography>
        </Box>
      </Box>

      {/* 정보 영역 */}
      <Box sx={{
        bgcolor: '#111', px: 2.5, pt: 2, pb: 2, height: 231,
        display: 'flex', flexDirection: 'column', borderRadius: '0 0 8px 8px',
      }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.4, mb: 0.6 }}>
          {movie.title}
        </Typography>
        <Typography sx={{ color: '#888', fontSize: '0.78rem', mb: 1.2 }}>
          {movie.genre}/{movie.country} · {movie.runtime}&nbsp;&nbsp;|&nbsp;&nbsp;예매율 {movie.reservationRate}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 'auto' }}>
          <StarIcon sx={{ color: '#f5c518', fontSize: '1rem' }} />
          <Typography sx={{ color: '#fff', fontSize: '0.88rem' }}>
            {movie.stars} ({movie.reviews})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button variant="outlined" sx={{
            flex: 1, py: 1.2, borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem',
            color: '#111', borderColor: '#ccc', bgcolor: '#fff',
            '&:hover': { bgcolor: '#f0f0f0', borderColor: '#aaa' },
          }}>
            상세보기
          </Button>
          <Button variant="contained" sx={{
            flex: 1, py: 1.2, borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem',
            bgcolor: '#E8000D', '&:hover': { bgcolor: '#c00000' },
          }}>
            예매하기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

function ComingSoon() {
  return (
    <Box sx={{ bgcolor: '#fff', py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography sx={{ color: '#E8000D', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 3, mb: 0.5 }}>
          COMING SOON
        </Typography>
        <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', mb: 3 }}>개봉예정영화</Typography>
        <Box sx={{
          display: 'flex', gap: 2, overflowX: 'auto', pb: 1,
          scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
        }}>
          {movies.map((movie, i) => <ComingCard key={i} movie={movie} />)}
        </Box>
      </Box>
    </Box>
  )
}

export default ComingSoon
