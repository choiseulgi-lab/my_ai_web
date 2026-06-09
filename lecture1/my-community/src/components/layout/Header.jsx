import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'

function Logo({ onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', userSelect: 'none' }}
    >
      {/* 원형 뱃지 */}
      <Box sx={{
        width: 42, height: 42, borderRadius: '50%',
        border: '2.5px solid', borderColor: 'primary.main',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        bgcolor: 'primary.main', flexShrink: 0,
      }}>
        <Typography sx={{ fontSize: 9, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: 0.5 }}>
          THE
        </Typography>
        <Typography sx={{ fontSize: 9, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: 0.5 }}>
          MAT
        </Typography>
      </Box>

      {/* 텍스트 */}
      <Box>
        <Typography sx={{
          fontSize: '1.25rem', fontWeight: 900, lineHeight: 1.1,
          letterSpacing: '-0.5px', color: 'primary.main',
        }}>
          THEMAT
        </Typography>
        <Typography sx={{
          fontSize: '0.6rem', fontWeight: 500, lineHeight: 1,
          color: 'text.secondary', letterSpacing: '1px',
        }}>
          맛집 커뮤니티
        </Typography>
      </Box>
    </Box>
  )
}

function Header() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '2px solid', borderColor: 'primary.main' }}
    >
      <Toolbar sx={{ maxWidth: 600, width: '100%', mx: 'auto', px: 2, minHeight: '56px !important' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Logo onClick={() => navigate('/')} />
        </Box>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => navigate('/write')}
              size="small"
              sx={{
                bgcolor: 'primary.main', color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                width: 32, height: 32,
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 700 }}
              onClick={handleSignOut}
            >
              {profile?.nickname?.[0] ?? '?'}
            </Avatar>
          </Box>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/login')}
            sx={{ borderRadius: 20, px: 2, fontSize: '0.8rem' }}
          >
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
