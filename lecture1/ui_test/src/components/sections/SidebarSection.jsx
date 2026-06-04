import { useState } from 'react'
import {
  Box, Button, Drawer, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Divider,
  Stack, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import SettingsIcon from '@mui/icons-material/Settings'

const MENU_ITEMS = [
  { label: '홈', icon: <HomeIcon />, href: '#home' },
  { label: '프로필', icon: <PersonIcon />, href: '#profile' },
  { label: '게시글', icon: <ArticleIcon />, href: '#articles' },
  { label: '저장됨', icon: <BookmarkIcon />, href: '#bookmarks' },
]

function SidebarSection() {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [selected, setSelected] = useState('홈')

  const handleAnchorChange = (_, newAnchor) => {
    if (newAnchor) setAnchor(newAnchor)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Sidebar</Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>위치 선택</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={anchor}
          exclusive
          onChange={handleAnchorChange}
          size="small"
        >
          <ToggleButton value="left">왼쪽</ToggleButton>
          <ToggleButton value="right">오른쪽</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={() => setOpen(true)}>
          사이드바 열기
        </Button>
      </Stack>

      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, pb: 1 }}>네비게이션</Typography>
          <Divider />
          <List>
            {MENU_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  selected={selected === item.label}
                  onClick={() => {
                    setSelected(item.label)
                    setOpen(false)
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(false)}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="설정" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Typography variant="body2" color="text.secondary">
        선택된 메뉴: <strong>{selected}</strong> · 위치: <strong>{anchor === 'left' ? '왼쪽' : '오른쪽'}</strong>
      </Typography>
    </Box>
  )
}

export default SidebarSection
