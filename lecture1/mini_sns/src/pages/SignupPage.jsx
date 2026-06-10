import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, CircularProgress, IconButton } from '@mui/material'
import { ArrowBackIosNew as ArrowBackIosNewIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'

const PROFILE_IMAGE_URL = (seed) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`

function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', nickname: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignup = async () => {
    if (!form.username || !form.password || !form.nickname) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if (form.password.length < 4) {
      setError('비밀번호는 4자 이상 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError('')

    // 아이디 중복 확인
    const { data: existing } = await supabase
      .from('dorun_users')
      .select('id')
      .eq('username', form.username)
      .single()

    if (existing) {
      setIsLoading(false)
      setError('이미 사용 중인 아이디입니다.')
      return
    }

    const profileUrl = PROFILE_IMAGE_URL(form.username)

    const { error: insertError } = await supabase
      .from('dorun_users')
      .insert({
        username: form.username,
        password: form.password,
        nickname: form.nickname,
        profile_image_url: profileUrl,
      })

    setIsLoading(false)

    if (insertError) {
      setError('회원가입 중 오류가 발생했습니다.')
      return
    }

    alert('회원가입 완료! 로그인해주세요.')
    navigate('/login')
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'background.default',
        px: 3,
        py: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate('/login')} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>회원가입</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        <TextField
          name="username"
          label="아이디"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          name="nickname"
          label="닉네임"
          variant="outlined"
          fullWidth
          value={form.nickname}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSignup}
          disabled={isLoading}
          sx={{ borderRadius: 3, py: 1.5, mt: 1, fontSize: '1rem' }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : '회원가입'}
        </Button>
      </Box>
    </Box>
  )
}

export default SignupPage
