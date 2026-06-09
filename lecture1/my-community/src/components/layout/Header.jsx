import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'

function Header() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'white', color: 'text.primary' }}>
      <Toolbar sx={{ maxWidth: 600, width: '100%', mx: 'auto', px: 2 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          color="primary"
          sx={{ cursor: 'pointer', letterSpacing: '-1px', flexGrow: 1 }}
          onClick={() => navigate('/')}
        >
          THEMAT
        </Typography>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="primary" onClick={() => navigate('/write')} size="small">
              <AddIcon />
            </IconButton>
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', cursor: 'pointer' }}
              onClick={handleSignOut}
            >
              {profile?.nickname?.[0] ?? '?'}
            </Avatar>
          </Box>
        ) : (
          <Button variant="contained" size="small" onClick={() => navigate('/login')}>
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
