import { useState, useRef } from 'react'
import {
  Box, Typography, Card, CardMedia,
  CardContent, CardActions, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stack, Rating, IconButton
} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const CARDS = [
  {
    name: '을지로 양꼬치',
    category: '중식',
    desc: '숯불에 구운 양꼬치 전문점. 직화 향이 살아있는 정통 양꼬치.',
    isOpen: true,
    rating: 4.5,
    review: '양꼬치가 정말 맛있어요! 소스도 특제라 특별한 맛. 웨이팅이 있지만 충분히 기다릴 가치 있음.',
    color: '#d32f2f',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop',
  },
  {
    name: '삼청동 수제비',
    category: '한식',
    desc: '30년 전통의 손수 만든 수제비. 진한 멸치 육수가 일품.',
    isOpen: true,
    rating: 4.2,
    review: '추운 날 딱 생각나는 수제비집. 국물이 정말 깊고 진해요. 어머니 손맛이 느껴지는 곳.',
    color: '#388e3c',
    img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=200&fit=crop',
  },
  {
    name: '이태원 버거바',
    category: '양식',
    desc: '두툼한 수제 패티가 들어간 아메리칸 스타일 버거 전문점.',
    isOpen: false,
    rating: 4.0,
    review: '패티가 두껍고 육즙이 풍부해요. 번도 직접 구워서 나와서 맛있음. 사이드 메뉴도 추천!',
    color: '#f57c00',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop',
  },
  {
    name: '홍대 마라탕',
    category: '중식',
    desc: '직접 골라 담는 마라탕. 얼얼하고 강렬한 마라 향이 중독적.',
    isOpen: true,
    rating: 4.7,
    review: '마라 향이 진해서 마라탕 마니아라면 강추! 재료 신선하고 양도 푸짐. 단골 될 것 같아요.',
    color: '#7b1fa2',
    img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=200&fit=crop',
  },
  {
    name: '연남동 파스타',
    category: '양식',
    desc: '매일 직접 뽑는 생면 파스타. 트러플 크림소스가 시그니처.',
    isOpen: true,
    rating: 4.6,
    review: '생면 파스타가 이렇게 맛있을 줄 몰랐어요. 트러플 향이 진하고 크림소스가 진짜 부드러워요.',
    color: '#0288d1',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=200&fit=crop',
  },
]

const CATEGORIES = ['전체', '한식', '중식', '양식', '일식', '분식']
const CARD_WIDTH = 260
const SCROLL_AMOUNT = CARD_WIDTH + 16

function CardSection() {
  const [elevated, setElevated] = useState(null)
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('전체')
  const scrollRef = useRef(null)

  const handleOpen = (card) => setSelected(card)
  const handleClose = () => setSelected(null)
  const handlePrev = () => scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
  const handleNext = () => scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })

  const filtered = category === '전체' ? CARDS : CARDS.filter((c) => c.category === category)

  return (
    <Box sx={{ mb: 6 }}>

      {/* 카테고리 버튼 + 이전/다음 버튼 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, width: '100%' }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {CATEGORIES.map((item) => {
            const isActive = category === item
            return (
              <Button
                key={item}
                size="small"
                variant={isActive ? 'contained' : 'outlined'}
                onClick={() => setCategory(item)}
                sx={{
                  borderRadius: 5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {item}
              </Button>
            )
          })}
        </Stack>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
          <IconButton size="small" onClick={handlePrev}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={handleNext}><ArrowForwardIosIcon fontSize="small" /></IconButton>
          <IconButton size="small"><MoreHorizIcon /></IconButton>
        </Box>
      </Stack>

      {/* 가로 스와이프 카드 목록 */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          pb: 1,
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 2 },
        }}
      >
        {filtered.map((card) => (
          <Card
            key={card.name}
            elevation={elevated === card.name ? 8 : 1}
            onMouseEnter={() => setElevated(card.name)}
            onMouseLeave={() => setElevated(null)}
            onClick={() => handleOpen(card)}
            sx={{
              minWidth: CARD_WIDTH,
              maxWidth: CARD_WIDTH,
              scrollSnapAlign: 'start',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s',
            }}
          >
            <CardMedia component="img" height="140" image={card.img} alt={card.name} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" noWrap sx={{ mb: 0.5 }}>{card.name}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Chip label={card.category} size="small" sx={{ bgcolor: card.color, color: 'white' }} />
                <Stack direction="row" alignItems="center" spacing={0.3}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: card.isOpen ? 'success.main' : 'error.main' }} />
                  <Typography variant="caption" color={card.isOpen ? 'success.main' : 'error.main'}>
                    {card.isOpen ? '영업중' : '영업종료'}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{card.desc}</Typography>
              <Rating value={card.rating} precision={0.5} size="small" readOnly />
            </CardContent>
            <CardActions>
              <Button size="small">상세보기</Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* 모달 */}
      <Dialog open={Boolean(selected)} onClose={handleClose} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6">{selected.name}</Typography>
                <Chip label={selected.category} size="small" sx={{ bgcolor: selected.color, color: 'white' }} />
                <Stack direction="row" alignItems="center" spacing={0.3}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: selected.isOpen ? 'success.main' : 'error.main' }} />
                  <Typography variant="caption" color={selected.isOpen ? 'success.main' : 'error.main'}>
                    {selected.isOpen ? '영업중' : '영업종료'}
                  </Typography>
                </Stack>
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Box component="img" src={selected.img} alt={selected.name} sx={{ width: '100%', borderRadius: 1, mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>{selected.desc}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Rating value={selected.rating} precision={0.5} size="small" readOnly />
                <Typography variant="body2" color="text.secondary">{selected.rating} / 5</Typography>
              </Stack>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>리뷰</Typography>
              <Typography variant="body2" color="text.secondary">"{selected.review}"</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button variant="contained" onClick={handleClose}>확인</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default CardSection
