import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Typography, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

function Logo({ onClick }) {
  return (
    <Box onClick={onClick} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}>
      <Box sx={{
        width: 38, height: 38, borderRadius: '50%', bgcolor: 'primary.main',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <Typography sx={{ fontSize: 8, fontWeight: 900, color: 'white', lineHeight: 1.2, letterSpacing: 0.5 }}>THE</Typography>
        <Typography sx={{ fontSize: 8, fontWeight: 900, color: 'white', lineHeight: 1.2, letterSpacing: 0.5 }}>MAT</Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px', color: 'primary.main' }}>
          THEMAT
        </Typography>
        <Typography sx={{ fontSize: '0.55rem', fontWeight: 500, color: 'text.secondary', letterSpacing: '1px' }}>
          맛집 커뮤니티
        </Typography>
      </Box>
    </Box>
  )
}

function Header({ onSearch, searchValue, onSearchChange }) {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{
      bgcolor: 'white', color: 'text.primary',
      borderBottom: '1px solid', borderColor: 'grey.200',
    }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, gap: 2, minHeight: '60px !important' }}>

        <Logo onClick={() => navigate('/')} />

        {/* 검색창 */}
        <Box
          component="form"
          onSubmit={onSearch}
          sx={{
            flex: 1, maxWidth: 440,
            display: 'flex', alignItems: 'center',
            bgcolor: 'grey.100', borderRadius: 24, px: 2, py: 0.5,
            '&:focus-within': { bgcolor: 'grey.200' }, transition: 'background 0.2s',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
          <InputBase
            placeholder="맛집, 지역, 메뉴 검색..."
            value={searchValue}
            onChange={onSearchChange}
            sx={{ flex: 1, fontSize: '0.875rem' }}
          />
        </Box>

        {/* 우측 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
          {user && profile && (
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' }, whiteSpace: 'nowrap' }}>
              <Typography component="span" color="primary" fontWeight={700}>{profile.nickname}</Typography>님
            </Typography>
          )}
          {user ? (
            <>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => navigate('/write')}
                sx={{ borderRadius: 20, px: 2, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                글쓰기
              </Button>
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 700 }}
                onClick={handleSignOut}
              >
                {profile?.nickname?.[0] ?? '?'}
              </Avatar>
            </>
          ) : (
            <Button variant="contained" size="small" onClick={() => navigate('/login')} sx={{ borderRadius: 20, px: 2 }}>
              로그인
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* 레드 포인트 라인 */}
      <Box sx={{ height: 2, background: 'linear-gradient(90deg, #e53935, #ff7043)' }} />
    </AppBar>
  )
}

export default Header
