import { useState } from 'react'
import { Box, Button, Menu, MenuItem, Typography, ListItemIcon, ListItemText, Divider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'

const MENU_ITEMS = [
  { label: '홈', icon: <HomeIcon fontSize="small" /> },
  { label: '프로필', icon: <PersonIcon fontSize="small" /> },
  { label: '알림', icon: <NotificationsIcon fontSize="small" /> },
  { label: '저장됨', icon: <BookmarkIcon fontSize="small" /> },
  { label: '설정', icon: <SettingsIcon fontSize="small" /> },
]

function MenuSection() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState('')

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSelect = (label) => {
    setSelected(label)
    handleClose()
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Menu</Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>Dropdown Menu</Typography>
      <Button variant="contained" onClick={handleOpen}>
        메뉴 열기
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.label} onClick={() => handleSelect(item.label)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => handleSelect('로그아웃')} sx={{ color: 'error.main' }}>
          <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>로그아웃</ListItemText>
        </MenuItem>
      </Menu>

      {selected && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          선택한 메뉴: <strong>{selected}</strong>
        </Typography>
      )}
    </Box>
  )
}

export default MenuSection
