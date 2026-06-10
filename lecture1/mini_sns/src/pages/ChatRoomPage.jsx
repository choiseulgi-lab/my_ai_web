import { useState } from 'react'
import { Box, Typography, Avatar, IconButton, TextField, InputAdornment } from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const ROOM_INFO = {
  '1': { name: '김여행', type: '1:1', participants: 2, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=traveler1' },
  '2': { name: '부산 광안리 여행 모임', type: '그룹', participants: 5, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=busan-group' },
  '3': { name: '박제주', type: '1:1', participants: 2, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=traveler2' },
  '4': { name: '전주 한옥마을 탐방단', type: '그룹', participants: 8, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jeonju-group' },
}

const MOCK_MESSAGES = {
  '1': [
    { id: 1, sender: 'other', name: '김여행', text: '안녕! 제주도 언제 가?', time: '오후 2:30' },
    { id: 2, sender: 'me', text: '이번 주말에 갈 것 같아!', time: '오후 2:31' },
    { id: 3, sender: 'other', name: '김여행', text: '오 부러워~ 제주도 일정 어떻게 됐어?', time: '오후 2:34' },
  ],
  '2': [
    { id: 1, sender: 'other', name: '이부산', text: '다들 이번 여행 기대되죠?', time: '오전 10:50' },
    { id: 2, sender: 'other', name: '최광안', text: '맞아요! 광안대교 보고 싶어요 🌉', time: '오전 10:55' },
    { id: 3, sender: 'me', text: '저도 너무 기대돼요!', time: '오전 11:00' },
    { id: 4, sender: 'other', name: '이부산', text: '이번 주 토요일 오후 3시에 만나요!', time: '오전 11:10' },
  ],
  '3': [
    { id: 1, sender: 'other', name: '박제주', text: '게시물 봤어! 진짜 멋지다', time: '어제 오후 6:20' },
    { id: 2, sender: 'me', text: '고마워 ㅎㅎ 직접 찍은 거야', time: '어제 오후 6:22' },
    { id: 3, sender: 'other', name: '박제주', text: '사진 너무 예쁘다 🌊', time: '어제 오후 6:23' },
  ],
  '4': [
    { id: 1, sender: 'other', name: '정전주', text: '다음 모임 언제가 좋을까요?', time: '월요일 오후 3:00' },
    { id: 2, sender: 'other', name: '한옥지기', text: '저는 주말이 편해요!', time: '월요일 오후 3:05' },
    { id: 3, sender: 'me', text: '저도 주말 좋아요', time: '월요일 오후 3:10' },
    { id: 4, sender: 'other', name: '정전주', text: '다음 모임 장소 투표해요~', time: '월요일 오후 3:15' },
  ],
}

function ChatRoomPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const room = ROOM_INFO[id] || { name: '채팅방', type: '1:1', participants: 2 }
  const [messages, setMessages] = useState(MOCK_MESSAGES[id] || [])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'me', text: input.trim(), time: '방금' },
    ])
    setInput('')
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 10,
        bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider',
        display: 'flex', alignItems: 'center', px: 1, py: 1, gap: 1,
      }}>
        <IconButton onClick={() => navigate('/chat')}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Avatar src={room.avatar} sx={{ width: 36, height: 36, bgcolor: 'primary.light' }}>
          {room.name[0]}
        </Avatar>
        <Box>
          <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1.2 }}>{room.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {room.type === '그룹' ? `${room.participants}명` : '1:1 채팅'}
          </Typography>
        </Box>
      </Box>

      {/* 메시지 목록 */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5, pb: '72px' }}>
        {messages.map(msg => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: msg.sender === 'me' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            {msg.sender === 'other' && (
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontSize: '0.8rem', flexShrink: 0 }}>
                {msg.name?.[0]}
              </Avatar>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
              {msg.sender === 'other' && room.type === '그룹' && (
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.3, ml: 0.5 }}>
                  {msg.name}
                </Typography>
              )}
              <Box
                sx={{
                  px: 1.5, py: 1, borderRadius: msg.sender === 'me' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  bgcolor: msg.sender === 'me' ? 'primary.main' : 'background.paper',
                  color: msg.sender === 'me' ? 'white' : 'text.primary',
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.3, mx: 0.5 }}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 입력창 */}
      <Box sx={{
        position: 'fixed', bottom: 64, left: 0, right: 0,
        maxWidth: 480, mx: 'auto',
        bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider',
        px: 2, py: 1.5,
      }}>
        <TextField
          fullWidth
          size="small"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, pr: 0.5 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  sx={{ color: input.trim() ? 'primary.main' : 'text.disabled' }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  )
}

export default ChatRoomPage
