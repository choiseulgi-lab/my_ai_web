import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material'
import {
  GroupsOutlined as GroupsOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  DateRangeOutlined as CalendarTodayOutlinedIcon,
  PeopleOutlined as PeopleOutlinedIcon,
} from '@mui/icons-material'
import PageLayout from '../components/layout/PageLayout.jsx'

const MOCK_GROUPS = [
  {
    id: 1,
    title: '제주도 봄 여행 동행 모집',
    location: '제주도',
    date: '2026.07.10 ~ 07.14',
    capacity: '4명 모집 중',
    current: 2,
    tags: ['#제주', '#봄여행', '#사진'],
  },
  {
    id: 2,
    title: '강릉 오션뷰 카페 투어',
    location: '강릉',
    date: '2026.07.20 ~ 07.21',
    capacity: '3명 모집 중',
    current: 1,
    tags: ['#강릉', '#카페투어', '#바다'],
  },
  {
    id: 3,
    title: '부산 광안리 야경 & 맛집',
    location: '부산',
    date: '2026.08.01 ~ 08.03',
    capacity: '5명 모집 중',
    current: 3,
    tags: ['#부산', '#야경', '#맛집'],
  },
  {
    id: 4,
    title: '전주 한옥마을 역사 탐방',
    location: '전주',
    date: '2026.08.15 ~ 08.16',
    capacity: '6명 모집 중',
    current: 2,
    tags: ['#전주', '#한옥', '#문화'],
  },
]

function TravelGroupPage() {
  return (
    <PageLayout>
      <Box sx={{ px: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <GroupsOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h5" fontWeight={600}>여행 모임 찾기</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MOCK_GROUPS.map(group => (
            <Card key={group.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                  {group.title}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{group.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{group.date}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <PeopleOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{group.capacity}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                  {group.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 22,
                      }}
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  참가하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </PageLayout>
  )
}

export default TravelGroupPage
