import { Box, IconButton, Typography, Fab } from '@mui/material'
import {
  Home as HomeFilledIcon,
  HomeOutlined as HomeOutlinedIcon,
  Groups as GroupsFilledIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  Add as AddIcon,
  ModeComment as ChatFilledIcon,
  ModeCommentOutlined as ChatOutlinedIcon,
  Person as PersonFilledIcon,
  PersonOutlined as PersonOutlinedIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: '홈', path: '/', IconActive: HomeFilledIcon, IconInactive: HomeOutlinedIcon },
  { label: '모임', path: '/group', IconActive: GroupsFilledIcon, IconInactive: GroupsOutlinedIcon },
  null, // 중앙 FAB 자리
  { label: '채팅', path: '/chat', IconActive: ChatFilledIcon, IconInactive: ChatOutlinedIcon },
  { label: '마이', path: '/mypage', IconActive: PersonFilledIcon, IconInactive: PersonOutlinedIcon },
]

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        px: 1,
      }}
    >
      {NAV_ITEMS.map((item, idx) => {
        if (item === null) {
          return (
            <Box key="fab" sx={{ position: 'relative', width: 56, display: 'flex', justifyContent: 'center' }}>
              <Fab
                color="primary"
                size="medium"
                onClick={() => navigate('/create')}
                sx={{
                  position: 'absolute',
                  top: -32,
                  boxShadow: '0 4px 14px rgba(77,166,255,0.45)',
                  width: 52,
                  height: 52,
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
          )
        }

        const active = isActive(item.path)
        const Icon = active ? item.IconActive : item.IconInactive

        return (
          <Box
            key={idx}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              flex: 1,
              py: 0.5,
              gap: 0.3,
            }}
          >
            {/* 아이콘 + pill 인디케이터 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 28,
                borderRadius: '14px',
                bgcolor: active ? 'primary.main' : 'transparent',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Icon
                sx={{
                  fontSize: 22,
                  color: active ? '#fff' : 'text.secondary',
                  transition: 'color 0.2s ease',
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: active ? 700 : 400,
                color: active ? 'primary.main' : 'text.secondary',
                lineHeight: 1,
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default BottomNav
