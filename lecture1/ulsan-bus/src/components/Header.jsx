import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
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
            fontWeight: 800,
            letterSpacing: '-0.5px',
            fontSize: '1.375rem',
          }}
        >
          ULSAN BUS
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: 'text.primary' }}>
            <SearchIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.primary' }}>
            <BookmarkBorderIcon />
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
