import { Box, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const MENU_ITEMS = ['영화', '예매', '영화관', '이벤트·혜택', '멤버십']

function CgvNavSection() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Flex Navigation 2 (CGV Style)
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '72px',
          bgcolor: '#ffffff',
          px: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderRadius: 1,
        }}
      >
        {/* 로고 박스 (왼쪽) */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Typography
            sx={{
              color: '#ED1C24',
              fontWeight: 'bold',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            CGV
          </Typography>
        </Box>

        {/* 메뉴 박스 (가운데) */}
        <Box sx={{ display: 'flex', gap: '16px' }}>
          {MENU_ITEMS.map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#111111',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
                '&:hover': { color: '#ED1C24' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* 로그인 박스 (오른쪽) */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
          {['로그인', '회원가입'].map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#111111',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#ED1C24' },
              }}
            >
              {item}
            </Typography>
          ))}
          <IconButton sx={{ p: 0.5, color: '#111111', '&:hover': { color: '#ED1C24' } }}>
            <MenuIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CgvNavSection
