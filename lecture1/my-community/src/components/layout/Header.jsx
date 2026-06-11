import { useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Typography, InputBase, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getAvatarUrl } from '../../utils/auth'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'

function Logo({ onClick }) {
  return (
    <Box onClick={onClick} sx={{ cursor: 'pointer', userSelect: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}thematlogo.png`}
        alt="THEMAT"
        sx={{ height: 52, width: 'auto', my: '-8px', objectFit: 'contain' }}
      />
    </Box>
  )
}

function Header({ onSearch, searchValue, onSearchChange }) {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleSignOut = async () => {
    handleMenuClose()
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

              {/* 프로필 아바타 → 메뉴 */}
              <Box
                onClick={handleMenuOpen}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer',
                  px: 1, py: 0.5, borderRadius: 20,
                  '&:hover': { bgcolor: 'grey.100' }, transition: 'background 0.15s'
                }}
              >
                <Avatar
                  src={user?.id ? getAvatarUrl(user.id) : undefined}
                  sx={{ width: 30, height: 30, bgcolor: 'primary.main', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  {profile?.nickname?.[0] ?? '?'}
                </Avatar>
                <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {profile?.nickname}
                </Typography>
              </Box>

              {/* 드롭다운 메뉴 */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 3,
                  sx: { mt: 0.5, minWidth: 160, borderRadius: 2 }
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={700}>{profile?.nickname}</Typography>
                  <Typography variant="caption" color="text.secondary">@{profile?.username}</Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleSignOut} sx={{ gap: 1.5, color: 'error.main', py: 1.25 }}>
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                  </ListItemIcon>
                  로그아웃
                </MenuItem>
              </Menu>
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
