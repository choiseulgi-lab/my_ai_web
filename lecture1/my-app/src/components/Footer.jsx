import { Box, Typography, Divider } from '@mui/material'

const links = ['개인정보처리방침', '영상정보처리기기운영관리방침', '이용약관', '제휴/광고문의', '사이버감사실']

function Footer() {
  return (
    <Box sx={{ bgcolor: '#0d0d0d', py: 5, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography sx={{ color: '#aaa', fontSize: '0.85rem', fontWeight: 700, mb: 2 }}>
          CJ CGV(주)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 3 }, mb: 2.5 }}>
          {links.map(link => (
            <Typography key={link} sx={{
              color: '#666', fontSize: '0.75rem', cursor: 'pointer',
              '&:hover': { color: '#aaa', textDecoration: 'underline' },
            }}>
              {link}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2a2a2a', mb: 2.5 }} />
        <Typography sx={{ color: '#444', fontSize: '0.72rem', lineHeight: 2 }}>
          서울특별시 중구 통일로 10 연세재단세브란스빌딩 &nbsp;·&nbsp; 대표이사: 허민회<br />
          사업자등록번호: 117-81-22536 &nbsp;·&nbsp; 통신판매업신고번호: 중구-인터넷-2008-002호<br />
          고객센터: cgv.co.kr &nbsp;·&nbsp; 이메일: help@cgv.co.kr<br />
          COPYRIGHT ⓒ CJ CGV. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
