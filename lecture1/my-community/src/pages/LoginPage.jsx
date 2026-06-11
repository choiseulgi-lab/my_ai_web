import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Alert, InputAdornment, IconButton, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) { setError('아이디와 비밀번호를 입력해주세요.'); return }
    setLoading(true)
    const { error: err } = await signIn(form)
    if (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #c62828 0%, #e53935 40%, #ff7043 100%)',
      }}
    >
      {/* 좌측 브랜드 히어로 */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 6,
          color: '#fff',
        }}
      >
        <RestaurantMenuIcon sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
        <Typography
          sx={{
            fontSize: '3.5rem',
            fontWeight: 900,
            letterSpacing: '-1px',
            lineHeight: 1,
            mb: 1.5,
          }}
        >
          THE MAT
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            opacity: 0.8,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          맛집 정보 공유 커뮤니티
        </Typography>
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
            maxWidth: 280,
          }}
        >
          {['🍜 맛집 추천 · 공유', '⭐ 별점 · 댓글', '📍 지역별 탐색'].map((text) => (
            <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: '0.95rem', opacity: 0.85 }}>{text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 우측 로그인 폼 */}
      <Box
        sx={{
          width: { xs: '100%', md: 420 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(255,255,255,0.97)',
          }}
        >
          {/* 모바일 브랜드 헤더 */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 3 }}>
            <RestaurantMenuIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', color: 'primary.main', letterSpacing: '-0.5px' }}>
              THE MAT
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight={700} mb={0.5}>
            로그인
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            계정에 로그인하세요
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
            <TextField
              label="비밀번호"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ mt: 1 }}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default LoginPage
