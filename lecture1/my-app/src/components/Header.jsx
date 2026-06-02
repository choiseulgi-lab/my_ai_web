import { AppBar, Toolbar, Box, Button, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const navItems = ['영화', '예매', '상영관', '이벤트·혜택', '둘러보기']

function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, justifyContent: 'space-between', minHeight: '56px !important' }}>
        <Typography sx={{ color: '#E8000D', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.05em', cursor: 'pointer', lineHeight: 1 }}>
          CGV
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navItems.map(item => (
            <Button key={item} sx={{ color: '#222', fontWeight: 600, fontSize: '0.92rem', px: 2, '&:hover': { bgcolor: 'transparent', color: '#E8000D' } }}>
              {item}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button sx={{ color: '#666', fontSize: '0.78rem', minWidth: 'auto', px: 1 }}>로그인</Button>
          <Button sx={{ color: '#666', fontSize: '0.78rem', minWidth: 'auto', px: 1 }}>마이CGV</Button>
          <IconButton size="small"><MenuIcon sx={{ color: '#333', fontSize: '1.3rem' }} /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
