import { Box, Typography } from '@mui/material'

const MENU_ITEMS = ['홈', '소개', '상품', '연락처', '설정']

function FlexNavSection() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Flex Navigation
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '60px',
          bgcolor: '#2d3748',
          px: 3,
          borderRadius: 1,
        }}
      >
        <Typography
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          MyWebsite
        </Typography>

        <Box sx={{ display: 'flex', gap: '15px' }}>
          {MENU_ITEMS.map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#a0aec0',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#ffffff' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default FlexNavSection
