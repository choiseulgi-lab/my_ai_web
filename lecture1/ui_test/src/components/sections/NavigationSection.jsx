import { useState } from 'react'
import {
  Box, AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const MENU_ITEMS = ['홈', '소개', '서비스', '연락처']

function NavigationSection() {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Navigation</Typography>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, pb: 1 }}>메뉴</Typography>
          <Divider />
          <List>
            {MENU_ITEMS.map((menu) => (
              <ListItem key={menu} disablePadding>
                <ListItemButton
                  component="a"
                  href={`#${menu}`}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default NavigationSection
