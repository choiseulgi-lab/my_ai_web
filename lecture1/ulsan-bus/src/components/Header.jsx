import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <Typography
          variant="h1"
          sx={{
            color: 'primary.main',
            fontFamily: '"Protest Guerrilla", sans-serif',
            fontWeight: 400,
            letterSpacing: '0px',
            fontSize: '1.5rem',
          }}
        >
          ULSAN BUS
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: 'text.primary' }}>
            <SearchIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.primary' }}>
            <StarBorderIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.primary' }}>
            <NotificationsNoneIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
