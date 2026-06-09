import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, TextField, Button,
  Checkbox, FormControlLabel, Grid, Alert, Divider, Chip, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { supabase } from '../lib/supabase'
import RatingStars from '../components/common/RatingStars'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { RANDOM_IMAGE_API } from '../constants'

const CATEGORIES = ['한식', '중식', '일식', '카페', '술집', '기타']

const TAGS_LIST = [
  { id: 1, name: '#혼밥추천' }, { id: 2, name: '#데이트' }, { id: 3, name: '#주차가능' },
  { id: 4, name: '#가성비' }, { id: 5, name: '#분위기맛집' }, { id: 6, name: '#웨이팅있음' },
  { id: 7, name: '#반려동물동반' }, { id: 8, name: '#단체모임' }, { id: 9, name: '#야외테라스' },
  { id: 10, name: '#뷰맛집' }
]

const EMPTY_FORM = {
  title: '', store_name: '', region: '', address: '',
  main_menu: '', review: '', recommended_menu: '',
  atmosphere: '', tip: '', rating: 0, image_url: '',
  is_draft: false, tags: [], category: '기타'
}

function WritePostPage() {
  const navigate = useNavigate()
  const { id: editId } = useParams()
  const { user } = useAuth()
  const { createPost, updatePost, fetchPost } = usePosts()
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!editId

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (isEdit) {
      fetchPost(editId).then(({ data }) => {
        if (data) {
          setForm({
            ...data,
            tags: data.post_tags?.map(pt => pt.tag_id) ?? []
          })
        }
      })
    }
  }, [user, isEdit, editId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleTagToggle = (tagId) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  const handleRandomImage = () => {
    const seed = Math.floor(Math.random() * 1000)
    setForm(prev => ({ ...prev, image_url: `${RANDOM_IMAGE_API}?lock=${seed}` }))
  }

  const handleSubmit = async (isDraft = false) => {
    if (!form.title) { setError('제목을 입력해주세요.'); return }
    setLoading(true)
    const postData = { ...form, is_draft: isDraft }
    const { error: err } = isEdit
      ? await updatePost(editId, postData)
      : await createPost(postData, user.id)

    if (err) {
      setError(err.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          {isEdit ? '게시물 수정' : '맛집 등록'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label="제목 *" name="title" value={form.title} onChange={handleChange} />

          <Divider>카테고리</Divider>

          <ToggleButtonGroup
            value={form.category}
            exclusive
            onChange={(_, v) => v && setForm(prev => ({ ...prev, category: v }))}
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {CATEGORIES.map(cat => (
              <ToggleButton key={cat} value={cat} sx={{ px: 2, py: 0.5, borderRadius: '20px !important', fontSize: '0.85rem', border: '1px solid !important', borderColor: 'divider !important' }}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider>맛집 정보</Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="상호명" name="store_name" value={form.store_name} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="지역" name="region" value={form.region} onChange={handleChange} placeholder="ex. 서울 마포구" />
            </Grid>
          </Grid>

          <TextField label="주소" name="address" value={form.address} onChange={handleChange} />
          <TextField label="대표메뉴" name="main_menu" value={form.main_menu} onChange={handleChange} />

          <Divider>리뷰</Divider>

          <TextField label="방문 후기" name="review" value={form.review} onChange={handleChange} multiline rows={3} />
          <TextField label="추천 메뉴" name="recommended_menu" value={form.recommended_menu} onChange={handleChange} />
          <TextField label="분위기" name="atmosphere" value={form.atmosphere} onChange={handleChange} />
          <TextField label="꿀팁" name="tip" value={form.tip} onChange={handleChange} />

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>평점</Typography>
            <RatingStars value={form.rating} onChange={(v) => setForm(prev => ({ ...prev, rating: v }))} />
          </Box>

          <Divider>이미지</Divider>

          <Box>
            {form.image_url && (
              <Box
                component="img"
                src={form.image_url}
                alt="미리보기"
                sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2, mb: 1 }}
              />
            )}
            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={handleRandomImage}
              fullWidth
            >
              랜덤 이미지 추가
            </Button>
          </Box>

          <Divider>태그</Divider>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {TAGS_LIST.map(tag => (
              <Chip
                key={tag.id}
                label={tag.name}
                onClick={() => handleTagToggle(tag.id)}
                color={form.tags.includes(tag.id) ? 'primary' : 'default'}
                variant={form.tags.includes(tag.id) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleSubmit(true)}
              disabled={loading}
            >
              임시저장
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleSubmit(false)}
              disabled={loading}
            >
              {loading ? '등록 중...' : '게시물 등록'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default WritePostPage
