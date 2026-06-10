import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }
    setIsLoading(true)
    setError('')

    const { data, error: dbError } = await supabase
      .from('dorun_users')
      .select('*')
      .eq('username', form.username)
      .eq('password', form.password)
      .single()

    setIsLoading(false)

    if (dbError || !data) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    login(data)
    navigate('/')
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      {/* 로고 */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant="h1"
          sx={{ color: 'primary.main', fontWeight: 700, fontSize: '3rem', mb: 0.5 }}
        >
          ✈️ Dorun
        </Typography>
        <Typography variant="body2" color="text.secondary">
          여행 기록 & 경험 공유 SNS
        </Typography>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        <TextField
          name="username"
          label="아이디"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          disabled={isLoading}
          sx={{ borderRadius: 3, py: 1.5, mt: 1, fontSize: '1rem' }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : '로그인'}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate('/signup')}
          sx={{ borderRadius: 3, py: 1.5, fontSize: '1rem' }}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
