import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Link, Alert, InputAdornment, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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
    <Container maxWidth="xs">
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', bgcolor: 'primary.main',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2
          }}>
            <Typography variant="h4" color="white" fontWeight={900}>T</Typography>
          </Box>
          <Typography variant="h4" fontWeight={900} color="primary" letterSpacing={-1}>THEMAT</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>맛집 정보 공유 커뮤니티</Typography>
        </Box>

        <Typography variant="h5" fontWeight={700} mb={3}>로그인</Typography>

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
      </Box>
    </Container>
  )
}

export default LoginPage
