import { Box, Typography, IconButton } from '@mui/material'
import { NotificationsOutlined as NotificationsOutlinedIcon } from '@mui/icons-material'

function TopBar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        bgcolor: 'primary.main',
        px: 2.5,
        pt: 2,
        pb: 2.5,
      }}
    >
      {/* 상단 행: 앱 이름 + 알림 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.7rem' }}
        >
          Dorun
        </Typography>
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.85)', p: 0.5 }}>
          <NotificationsOutlinedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      {/* 메인 타이틀 */}
      <Typography
        sx={{
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.6rem',
          lineHeight: 1.15,
          letterSpacing: '-0.5px',
        }}
      >
        여행 기록
      </Typography>
      <Typography
        sx={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.8rem',
          fontWeight: 400,
          mt: 0.3,
        }}
      >
        오늘도 어디론가 떠나볼까요?
      </Typography>
    </Box>
  )
}

export default TopBar
