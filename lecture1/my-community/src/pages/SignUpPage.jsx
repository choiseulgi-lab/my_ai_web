import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Alert, InputAdornment, IconButton, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const PW_RULES = [
  { label: '8자 이상', test: (v) => v.length >= 8 },
  { label: '영문 포함', test: (v) => /[a-zA-Z]/.test(v) },
  { label: '숫자 포함', test: (v) => /[0-9]/.test(v) },
]

function SignUpPage() {
  const navigate = useNavigate()
  const { signUp, checkUsernameExists } = useAuth()
  const [form, setForm] = useState({ username: '', password: '', passwordConfirm: '', nickname: '' })
  const [errors, setErrors] = useState({})
  const [usernameChecked, setUsernameChecked] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'username') setUsernameChecked(null)
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCheckUsername = async () => {
    if (!form.username) { setErrors(prev => ({ ...prev, username: '아이디를 입력해주세요.' })); return }
    if (form.username.length < 4) { setErrors(prev => ({ ...prev, username: '아이디는 4자 이상이어야 합니다.' })); return }
    const exists = await checkUsernameExists(form.username)
    setUsernameChecked(!exists)
    if (exists) setErrors(prev => ({ ...prev, username: '이미 사용 중인 아이디입니다.' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!usernameChecked) newErrors.username = '아이디 중복확인을 해주세요.'
    if (!PW_RULES.every(r => r.test(form.password))) newErrors.password = '비밀번호 규칙을 확인해주세요.'
    if (form.password !== form.passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    if (!form.nickname) newErrors.nickname = '닉네임을 입력해주세요.'

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setLoading(true)
    const { error } = await signUp({ username: form.username, password: form.password, nickname: form.nickname })
    if (error) {
      const msg = error.message
      if (msg.includes('rate limit')) {
        setErrors({ general: '잠시 후 다시 시도해주세요. (1분 후 재시도)' })
      } else if (msg.includes('already registered') || msg.includes('already exists')) {
        setErrors({ username: '이미 사용 중인 아이디입니다.' })
      } else {
        setErrors({ general: msg })
      }
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  const pwValid = form.password.length > 0

  return (
    <Container maxWidth="xs">
      <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>회원가입</Typography>

        {errors.general && <Alert severity="error">{errors.general}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 아이디 */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="아이디"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ flex: 1 }}
              InputProps={{
                endAdornment: usernameChecked === true && (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="outlined" onClick={handleCheckUsername} sx={{ height: 56, whiteSpace: 'nowrap' }}>
              중복확인
            </Button>
          </Box>
          {usernameChecked === true && (
            <Typography variant="caption" color="success.main" mt={-1.5} ml={0.5}>사용 가능한 아이디입니다.</Typography>
          )}

          {/* 비밀번호 */}
          <TextField
            label="비밀번호"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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

          {/* 비밀번호 규칙 */}
          {pwValid && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: -1 }}>
              {PW_RULES.map(rule => (
                <Chip
                  key={rule.label}
                  label={rule.label}
                  size="small"
                  icon={rule.test(form.password) ? <CheckCircleIcon /> : <CancelIcon />}
                  color={rule.test(form.password) ? 'success' : 'default'}
                  variant={rule.test(form.password) ? 'filled' : 'outlined'}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}

          <TextField
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm}
            disabled={!form.password}
          />

          <TextField
            label="닉네임"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            error={!!errors.nickname}
            helperText={errors.nickname}
          />

          <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ mt: 1 }}>
            {loading ? '가입 중...' : '가입완료'}
          </Button>
          <Button variant="text" onClick={() => navigate('/login')}>이미 계정이 있어요</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUpPage
