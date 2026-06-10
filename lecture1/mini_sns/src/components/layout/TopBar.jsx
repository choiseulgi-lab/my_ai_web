import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { NotificationsOutlined as NotificationsOutlinedIcon } from '@mui/icons-material'

function TopBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            letterSpacing: '-0.5px',
          }}
        >
          ✈️ Dorun
        </Typography>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <NotificationsOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
