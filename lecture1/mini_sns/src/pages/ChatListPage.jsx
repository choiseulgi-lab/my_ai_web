import { Box, Typography, Avatar, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'

const MOCK_ROOMS = [
  {
    id: '1',
    type: '1:1',
    name: '김여행',
    lastMessage: '제주도 일정 어떻게 됐어?',
    time: '오후 2:34',
    participants: 2,
    unread: 2,
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=traveler1',
  },
  {
    id: '2',
    type: '그룹',
    name: '부산 광안리 여행 모임',
    lastMessage: '이번 주 토요일 오후 3시에 만나요!',
    time: '오전 11:10',
    participants: 5,
    unread: 0,
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=busan-group',
  },
  {
    id: '3',
    type: '1:1',
    name: '박제주',
    lastMessage: '사진 너무 예쁘다 🌊',
    time: '어제',
    participants: 2,
    unread: 0,
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=traveler2',
  },
  {
    id: '4',
    type: '그룹',
    name: '전주 한옥마을 탐방단',
    lastMessage: '다음 모임 장소 투표해요~',
    time: '월요일',
    participants: 8,
    unread: 5,
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jeonju-group',
  },
]

function ChatListPage() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <Box sx={{ bgcolor: 'background.paper', mt: 0 }}>
        {MOCK_ROOMS.map((room, idx) => (
          <Box key={room.id}>
            <Box
              onClick={() => navigate(`/chat/${room.id}`)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2.5, py: 2, cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar src={room.avatar} sx={{ width: 50, height: 50, bgcolor: 'primary.light' }}>
                  {room.name[0]}
                </Avatar>
                {room.type === '그룹' && (
                  <Box sx={{
                    position: 'absolute', bottom: 0, right: 0,
                    bgcolor: 'primary.main', color: 'white',
                    fontSize: '0.6rem', borderRadius: '50%',
                    width: 18, height: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid white',
                  }}>
                    {room.participants}
                  </Box>
                )}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <Typography variant="body2" fontWeight={600}>{room.name}</Typography>
                    <Typography variant="caption" sx={{
                      px: 0.7, py: 0.1, borderRadius: 1, fontSize: '0.65rem',
                      bgcolor: room.type === '1:1' ? 'primary.light' : 'secondary.dark',
                      color: room.type === '1:1' ? 'white' : 'text.secondary',
                    }}>
                      {room.type}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.disabled">{room.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                    {room.lastMessage}
                  </Typography>
                  {room.unread > 0 && (
                    <Box sx={{
                      bgcolor: 'primary.main', color: 'white',
                      borderRadius: '50%', minWidth: 20, height: 20, px: 0.5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: 700,
                    }}>
                      {room.unread}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {idx < MOCK_ROOMS.length - 1 && <Divider sx={{ ml: 9 }} />}
          </Box>
        ))}
      </Box>
    </PageLayout>
  )
}

export default ChatListPage
