import { Box, Typography, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

const BASE = 'https://image.tmdb.org/t/p/w500'

const movies = [
  {
    rank: 1, title: '마이클', genre: '드라마', country: '미국', runtime: '148분',
    rating: '12', reservationRate: '4.8%', stars: '8.20', reviews: '1,204',
    poster: `${BASE}/piMZqtd0gGS7OgkhDwiQ7vVViBQ.jpg`,
  },
  {
    rank: 2, title: '악마는 프라다를 입는다 2', genre: '드라마', country: '미국', runtime: '119분',
    rating: '12', reservationRate: '10.2%', stars: '9.08', reviews: '3,801',
    poster: `${BASE}/28A1VUDML1RzENYNtIU1WkBLT9V.jpg`,
  },
  {
    rank: 3, title: '살목지', genre: '공포/스릴러', country: '한국', runtime: '88분',
    rating: '15', reservationRate: '8.2%', stars: '7.54', reviews: '2,103',
    poster: `${BASE}/uVJyWlSPCWftRUXRM6lxTqOzPY6.jpg`,
  },
  {
    rank: 4, title: '왕과 사는 남자', genre: '사극', country: '한국', runtime: '126분',
    rating: '12', reservationRate: '5.4%', stars: '9.21', reviews: '16,280',
    poster: `${BASE}/kkJB3SeUJp7Y0IXXLkv5QZHJGkH.jpg`,
  },
]

function MovieCard({ movie }) {
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
        {/* 순위 번호 */}
        <Typography sx={{
          position: 'absolute', top: 12, left: 18,
          color: '#fff', fontWeight: 900, fontSize: '5.5rem', lineHeight: 1,
          textShadow: '0 2px 12px rgba(0,0,0,0.85)',
        }}>
          {movie.rank}
        </Typography>
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

function NowShowing() {
  return (
    <Box sx={{ bgcolor: '#f7f7f7', py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography sx={{ color: '#E8000D', fontSize: '0.68rem', fontWeight: 700, letterSpacing: 3, mb: 0.5 }}>
          NOW SHOWING
        </Typography>
        <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', mb: 3 }}>현재 상영작</Typography>
        <Box sx={{
          display: 'flex', gap: 2, overflowX: 'auto', pb: 1,
          scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
        }}>
          {movies.map(movie => <MovieCard key={movie.rank} movie={movie} />)}
        </Box>
      </Box>
    </Box>
  )
}

export default NowShowing
