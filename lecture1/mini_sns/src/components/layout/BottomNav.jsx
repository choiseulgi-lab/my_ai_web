import { Paper, BottomNavigation, BottomNavigationAction, Fab, Box } from '@mui/material'
import {
  HomeOutlined as HomeOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  Add as AddIcon,
  ModeCommentOutlined as ChatBubbleOutlineIcon,
  PersonOutlined as PersonOutlineIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const getTabValue = () => {
    const path = location.pathname
    if (path === '/') return 0
    if (path === '/group') return 1
    if (path === '/mypage') return 4
    return -1
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 1200,
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <BottomNavigation
          value={getTabValue()}
          showLabels
          sx={{ width: '100%', height: 64, bgcolor: 'background.paper' }}
        >
          <BottomNavigationAction
            label="홈"
            icon={<HomeOutlinedIcon />}
            onClick={() => navigate('/')}
            sx={{ '&.Mui-selected': { color: 'primary.main' } }}
          />
          <BottomNavigationAction
            label="모임"
            icon={<GroupsOutlinedIcon />}
            onClick={() => navigate('/group')}
            sx={{ '&.Mui-selected': { color: 'primary.main' } }}
          />
          {/* 중앙 FAB 자리 */}
          <BottomNavigationAction disabled sx={{ visibility: 'hidden' }} />
          <BottomNavigationAction
            label="채팅"
            icon={<ChatBubbleOutlineIcon />}
            sx={{ color: 'text.secondary', cursor: 'default' }}
          />
          <BottomNavigationAction
            label="마이"
            icon={<PersonOutlineIcon />}
            onClick={() => navigate('/mypage')}
            sx={{ '&.Mui-selected': { color: 'primary.main' } }}
          />
        </BottomNavigation>

        {/* 중앙 게시물 작성 버튼 */}
        <Fab
          color="primary"
          size="medium"
          onClick={() => navigate('/create')}
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: -24,
            boxShadow: 3,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  )
}

export default BottomNav
